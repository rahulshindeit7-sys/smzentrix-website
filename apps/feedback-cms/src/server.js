import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createStore } from './db.js';

const PORT = Number(process.env.PORT || 8081);
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || '';
const ADMIN_AUTH_VERIFY_URL = process.env.ADMIN_AUTH_VERIFY_URL || '';
const ADMIN_LOGIN_URL = process.env.ADMIN_LOGIN_URL || '/';
const DB_PATH = process.env.DB_PATH || './data/feedback-store.json';
const CORS_ORIGINS = (process.env.CORS_ORIGINS || '*')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const app = express();
const store = createStore(DB_PATH);
const currentDir = path.dirname(fileURLToPath(import.meta.url));

const createFeedbackSchema = z.object({
  clientName: z.string().min(2).max(120),
  clinicName: z.string().min(2).max(160),
  rating: z.coerce.number().int().min(1).max(5),
  feedback: z.string().min(15).max(3000),
  source: z.string().min(2).max(32).optional(),
  createdAt: z.string().datetime().optional()
});

const statusSchema = z.object({
  status: z.enum(['approved', 'rejected'])
});

const showcaseStatusSchema = z.object({
  status: z.enum(['draft', 'published', 'archived'])
});

const showcaseSchema = z.object({
  title: z.string().min(3).max(120),
  doctorName: z.string().min(2).max(120),
  specialty: z.string().min(2).max(120),
  city: z.string().min(2).max(120),
  websiteUrl: z.string().url(),
  thumbnailUrl: z.string().url().optional().or(z.literal('')),
  summary: z.string().min(10).max(400),
  tags: z.array(z.string().min(2).max(40)).max(8).optional(),
  featured: z.boolean().optional(),
  sortOrder: z.coerce.number().int().min(0).max(9999).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional()
});

const showcasePatchSchema = showcaseSchema.partial();

async function isAdminAuthorized(req) {
  const apiKey = req.header('x-api-key') || req.header('x-admin-key');
  if (ADMIN_API_KEY && apiKey === ADMIN_API_KEY) {
    return true;
  }

  if (!ADMIN_AUTH_VERIFY_URL) {
    return false;
  }

  try {
    const verifyResponse = await fetch(ADMIN_AUTH_VERIFY_URL, {
      method: 'GET',
      redirect: 'manual',
      headers: {
        cookie: req.headers.cookie || '',
        authorization: req.headers.authorization || '',
        'x-forwarded-host': req.headers.host || ''
      }
    });

    return verifyResponse.ok;
  } catch (error) {
    console.error('Admin auth verification failed:', error);
    return false;
  }
}

async function requireAdminAuth(req, res, next) {
  const authorized = await isAdminAuthorized(req);
  if (!authorized) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  next();
}

async function requireCmsPageAuth(req, res, next) {
  const authorized = await isAdminAuthorized(req);
  if (!authorized) {
    res.redirect(302, ADMIN_LOGIN_URL);
    return;
  }
  next();
}

app.use(cors({
  origin(origin, callback) {
    if (!origin || CORS_ORIGINS.includes('*') || CORS_ORIGINS.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('CORS not allowed'));
  }
}));
app.use(express.json({ limit: '1mb' }));
app.use('/cms', requireCmsPageAuth, express.static(path.resolve(currentDir, '../public/cms')));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/feedback/submissions', (req, res) => {
  const parsed = createFeedbackSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid payload', errors: parsed.error.flatten() });
    return;
  }

  const payload = parsed.data;
  const now = new Date().toISOString();
  const createdAt = payload.createdAt || now;

  const created = store.insertFeedback({
    clientName: payload.clientName.trim(),
    clinicName: payload.clinicName.trim(),
    rating: payload.rating,
    feedback: payload.feedback.trim(),
    status: 'pending',
    source: payload.source?.trim() || 'website',
    createdAt,
    updatedAt: now
  });

  res.status(201).json({
    id: created.id,
    status: 'pending',
    message: 'Feedback submitted for moderation'
  });
});

app.get('/api/feedback/public', (req, res) => {
  const status = String(req.query.status || 'approved');
  if (status !== 'approved') {
    res.status(400).json({ message: 'Only approved status is public' });
    return;
  }

  const rows = store.listFeedback('approved', 50);
  res.json(rows);
});

app.get('/api/showcase/public', (req, res) => {
  const rows = store.listShowcase('published', 100);
  res.json(rows);
});

app.get('/api/admin/feedback', requireAdminAuth, (req, res) => {
  const status = String(req.query.status || 'pending');
  const allowed = new Set(['pending', 'approved', 'rejected', 'all']);
  if (!allowed.has(status)) {
    res.status(400).json({ message: 'Invalid status filter' });
    return;
  }

  const rows = store.listFeedback(status, 500);
  res.json(rows);
});

app.get('/api/admin/feedback/stats', requireAdminAuth, (req, res) => {
  res.json(store.stats());
});

app.patch('/api/admin/feedback/:id/status', requireAdminAuth, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ message: 'Invalid feedback id' });
    return;
  }

  const parsed = statusSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid status payload' });
    return;
  }

  const now = new Date().toISOString();
  const updated = store.updateStatus(id, parsed.data.status, now);
  if (!updated) {
    res.status(404).json({ message: 'Feedback not found' });
    return;
  }

  res.json(updated);
});

app.get('/api/admin/showcase', requireAdminAuth, (req, res) => {
  const status = String(req.query.status || 'all');
  const allowed = new Set(['draft', 'published', 'archived', 'all']);
  if (!allowed.has(status)) {
    res.status(400).json({ message: 'Invalid status filter' });
    return;
  }

  const rows = store.listShowcase(status, 500);
  res.json(rows);
});

app.get('/api/admin/showcase/stats', requireAdminAuth, (req, res) => {
  res.json(store.showcaseStats());
});

app.post('/api/admin/showcase', requireAdminAuth, (req, res) => {
  const parsed = showcaseSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid payload', errors: parsed.error.flatten() });
    return;
  }

  const payload = parsed.data;
  const now = new Date().toISOString();

  const created = store.insertShowcase({
    title: payload.title.trim(),
    doctorName: payload.doctorName.trim(),
    specialty: payload.specialty.trim(),
    city: payload.city.trim(),
    websiteUrl: payload.websiteUrl.trim(),
    thumbnailUrl: payload.thumbnailUrl?.trim() || '',
    summary: payload.summary.trim(),
    tags: Array.isArray(payload.tags) ? payload.tags : [],
    featured: Boolean(payload.featured),
    sortOrder: payload.sortOrder ?? 100,
    status: payload.status || 'draft',
    createdAt: now,
    updatedAt: now
  });

  res.status(201).json(created);
});

app.patch('/api/admin/showcase/:id', requireAdminAuth, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ message: 'Invalid showcase id' });
    return;
  }

  const parsed = showcasePatchSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid payload', errors: parsed.error.flatten() });
    return;
  }

  const patch = parsed.data;
  const updated = store.updateShowcase(id, {
    ...(patch.title !== undefined ? { title: patch.title.trim() } : {}),
    ...(patch.doctorName !== undefined ? { doctorName: patch.doctorName.trim() } : {}),
    ...(patch.specialty !== undefined ? { specialty: patch.specialty.trim() } : {}),
    ...(patch.city !== undefined ? { city: patch.city.trim() } : {}),
    ...(patch.websiteUrl !== undefined ? { websiteUrl: patch.websiteUrl.trim() } : {}),
    ...(patch.thumbnailUrl !== undefined ? { thumbnailUrl: patch.thumbnailUrl.trim() } : {}),
    ...(patch.summary !== undefined ? { summary: patch.summary.trim() } : {}),
    ...(patch.tags !== undefined ? { tags: patch.tags } : {}),
    ...(patch.featured !== undefined ? { featured: Boolean(patch.featured) } : {}),
    ...(patch.sortOrder !== undefined ? { sortOrder: patch.sortOrder } : {}),
    ...(patch.status !== undefined ? { status: patch.status } : {})
  }, new Date().toISOString());

  if (!updated) {
    res.status(404).json({ message: 'Showcase item not found' });
    return;
  }

  res.json(updated);
});

app.patch('/api/admin/showcase/:id/status', requireAdminAuth, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ message: 'Invalid showcase id' });
    return;
  }

  const parsed = showcaseStatusSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid status payload' });
    return;
  }

  const updated = store.updateShowcase(id, {
    status: parsed.data.status
  }, new Date().toISOString());

  if (!updated) {
    res.status(404).json({ message: 'Showcase item not found' });
    return;
  }

  res.json(updated);
});

app.delete('/api/admin/showcase/:id', requireAdminAuth, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ message: 'Invalid showcase id' });
    return;
  }

  const deleted = store.deleteShowcase(id);
  if (!deleted) {
    res.status(404).json({ message: 'Showcase item not found' });
    return;
  }

  res.json({ success: true });
});

app.use((err, req, res, next) => {
  if (err.message === 'CORS not allowed') {
    res.status(403).json({ message: err.message });
    return;
  }
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Feedback CMS server running on port ${PORT}`);
});
