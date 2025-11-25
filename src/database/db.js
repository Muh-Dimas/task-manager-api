const Database = require('better-sqlite3');

// Membuat / membuka database bernama tasks.db
const db = new Database('tasks.db');

// Membuat tabel jika belum ada
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed INTEGER DEFAULT 0
  )
`);

module.exports = db;