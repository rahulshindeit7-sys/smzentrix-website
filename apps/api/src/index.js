require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { leadsDb } = require('./db');
const { sendLeadNotificationEmail } = require('./mailer');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:3001',
    'http://localhost:5174',
    // Add your production domain: 'https://smzentrix.info'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────
function validateIndianMobile(mobile) {
  return /^[6-9]\d{9}$/.test(mobile.replace(/[\s\-]/g, ''));
}

function requireAdmin(req, res, next) {
  const auth = req.headers['authorization'];
  const password = process.env.ADMIN_PASSWORD || 'smzentrix@admin2024';
  if (!auth || auth !== `Bearer ${password}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

function getDateFilter(filter) {
  const now = new Date();
  if (filter === 'today') {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return { createdAt: { $gte: start } };
  }
  if (filter === '7days') {
    const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return { createdAt: { $gte: start } };
  }
  if (filter === '30days') {
    const start = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return { createdAt: { $gte: start } };
  }
  return {};
}

// ─── Routes ───────────────────────────────────────────────────────────────────

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * POST /api/leads
 * Submit a new lead from the popup
 */
app.post('/api/leads', async (req, res) => {
  try {
    const { name, mobile, product, message, source, page_url } = req.body;

    if (!mobile) {
      return res.status(400).json({ error: 'Mobile number is required.' });
    }
    const cleanMobile = mobile.replace(/[\s\-]/g, '').replace(/^\+91/, '');
    if (!validateIndianMobile(cleanMobile)) {
      return res.status(400).json({ error: 'Please enter a valid 10-digit Indian mobile number.' });
    }

    const lead = {
      name: name?.trim() || null,
      mobile: cleanMobile,
      product: product?.trim() || null,
      message: message?.trim() || null,
      source: source || 'Contact Page Popup',
      page_url: page_url || null,
    };

    const saved = await leadsDb.insert(lead);

    // Send email notification (non-blocking — never fail the response)
    sendLeadNotificationEmail(saved).catch((err) => {
      console.error('[Mailer] Email failed:', err.message);
    });

    return res.status(201).json({ success: true, message: 'Lead captured.', id: saved._id });
  } catch (err) {
    console.error('[POST /api/leads]', err);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

/**
 * GET /api/admin/leads
 * Returns leads with optional date filter
 * Query: ?filter=today|7days|30days|all
 * Header: Authorization: Bearer <ADMIN_PASSWORD>
 */
app.get('/api/admin/leads', requireAdmin, async (req, res) => {
  try {
    const { filter = 'all' } = req.query;
    const query = getDateFilter(filter);
    const leads = await leadsDb.find(query).sort({ createdAt: -1 });
    return res.json({ leads, total: leads.length });
  } catch (err) {
    console.error('[GET /api/admin/leads]', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

/**
 * GET /api/admin/stats
 * Summary counts
 */
app.get('/api/admin/stats', requireAdmin, async (req, res) => {
  try {
    const [total, today, week, month] = await Promise.all([
      leadsDb.count({}),
      leadsDb.count(getDateFilter('today')),
      leadsDb.count(getDateFilter('7days')),
      leadsDb.count(getDateFilter('30days')),
    ]);
    return res.json({ total, today, week, month });
  } catch (err) {
    return res.status(500).json({ error: 'Server error.' });
  }
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ SM Zentrix API running on http://localhost:${PORT}`);
  console.log(`   POST /api/leads         — submit a lead`);
  console.log(`   GET  /api/admin/leads   — admin: view leads`);
  console.log(`   GET  /api/admin/stats   — admin: counts`);
});
