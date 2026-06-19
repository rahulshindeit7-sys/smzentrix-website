const Datastore = require('nedb-promises');
const path = require('path');
const fs = require('fs');

// Ensure data directory exists
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Create the leads datastore (persisted to disk as a flat file)
const leadsDb = Datastore.create({
  filename: path.join(dataDir, 'leads.db'),
  autoload: true,
  timestampData: true, // auto-adds createdAt / updatedAt fields
});

module.exports = { leadsDb };
