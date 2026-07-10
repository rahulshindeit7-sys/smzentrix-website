import fs from 'node:fs';
import path from 'node:path';

function ensureStoreFile(dbPath) {
  const absolutePath = path.resolve(process.cwd(), dbPath);
  const directory = path.dirname(absolutePath);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  if (!fs.existsSync(absolutePath)) {
    fs.writeFileSync(absolutePath, JSON.stringify({
      nextFeedbackId: 1,
      nextShowcaseId: 1,
      feedback: [],
      showcase: []
    }, null, 2));
  }

  return absolutePath;
}

function readStore(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = JSON.parse(raw);
  const legacyNextFeedbackId = Number(parsed.nextId || 1);

  return {
    nextFeedbackId: Number(parsed.nextFeedbackId || legacyNextFeedbackId),
    nextShowcaseId: Number(parsed.nextShowcaseId || 1),
    feedback: Array.isArray(parsed.feedback) ? parsed.feedback : [],
    showcase: Array.isArray(parsed.showcase) ? parsed.showcase : []
  };
}

function writeStore(filePath, store) {
  fs.writeFileSync(filePath, JSON.stringify(store, null, 2));
}

function sortByCreatedAtDesc(items) {
  return [...items].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

function sortShowcase(items) {
  return [...items].sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }

    if (a.sortOrder !== b.sortOrder) {
      return a.sortOrder - b.sortOrder;
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export function createStore(dbPath) {
  const filePath = ensureStoreFile(dbPath);

  return {
    insertFeedback(entry) {
      const store = readStore(filePath);
      const id = store.nextFeedbackId;
      store.nextFeedbackId += 1;

      const feedback = {
        id,
        clientName: entry.clientName,
        clinicName: entry.clinicName,
        rating: entry.rating,
        feedback: entry.feedback,
        status: entry.status,
        source: entry.source,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt
      };

      store.feedback.push(feedback);
      writeStore(filePath, store);
      return feedback;
    },

    listFeedback(status = 'all', limit = 500) {
      const store = readStore(filePath);
      const filtered = status === 'all'
        ? store.feedback
        : store.feedback.filter((item) => item.status === status);
      return sortByCreatedAtDesc(filtered).slice(0, limit);
    },

    updateStatus(id, status, updatedAt) {
      const store = readStore(filePath);
      const index = store.feedback.findIndex((item) => item.id === id);
      if (index === -1) {
        return null;
      }

      store.feedback[index] = {
        ...store.feedback[index],
        status,
        updatedAt
      };

      writeStore(filePath, store);
      return store.feedback[index];
    },

    stats() {
      const store = readStore(filePath);
      const initial = { pending: 0, approved: 0, rejected: 0, total: 0 };
      return store.feedback.reduce((acc, item) => {
        acc.total += 1;
        if (item.status === 'pending') acc.pending += 1;
        if (item.status === 'approved') acc.approved += 1;
        if (item.status === 'rejected') acc.rejected += 1;
        return acc;
      }, initial);
    },

    insertShowcase(entry) {
      const store = readStore(filePath);
      const id = store.nextShowcaseId;
      store.nextShowcaseId += 1;

      const showcase = {
        id,
        title: entry.title,
        doctorName: entry.doctorName,
        specialty: entry.specialty,
        city: entry.city,
        websiteUrl: entry.websiteUrl,
        thumbnailUrl: entry.thumbnailUrl,
        summary: entry.summary,
        tags: entry.tags,
        featured: entry.featured,
        sortOrder: entry.sortOrder,
        status: entry.status,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt
      };

      store.showcase.push(showcase);
      writeStore(filePath, store);
      return showcase;
    },

    listShowcase(status = 'all', limit = 500) {
      const store = readStore(filePath);
      const filtered = status === 'all'
        ? store.showcase
        : store.showcase.filter((item) => item.status === status);
      return sortShowcase(filtered).slice(0, limit);
    },

    updateShowcase(id, patch, updatedAt) {
      const store = readStore(filePath);
      const index = store.showcase.findIndex((item) => item.id === id);
      if (index === -1) {
        return null;
      }

      store.showcase[index] = {
        ...store.showcase[index],
        ...patch,
        updatedAt
      };

      writeStore(filePath, store);
      return store.showcase[index];
    },

    deleteShowcase(id) {
      const store = readStore(filePath);
      const initialLength = store.showcase.length;
      store.showcase = store.showcase.filter((item) => item.id !== id);

      if (store.showcase.length === initialLength) {
        return false;
      }

      writeStore(filePath, store);
      return true;
    },

    showcaseStats() {
      const store = readStore(filePath);
      const initial = { draft: 0, published: 0, archived: 0, total: 0 };
      return store.showcase.reduce((acc, item) => {
        acc.total += 1;
        if (item.status === 'draft') acc.draft += 1;
        if (item.status === 'published') acc.published += 1;
        if (item.status === 'archived') acc.archived += 1;
        return acc;
      }, initial);
    }
  };
}
