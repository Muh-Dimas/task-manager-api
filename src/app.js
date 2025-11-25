const express = require('express');
const app = express();

const db = require('./database/db');

app.use(express.json());

// GET ALL TASKS
app.get('/tasks', (req, res) => {
  const stmt = db.prepare("SELECT * FROM tasks");
  const tasks = stmt.all();
  res.json(tasks);
});

// CREATE TASK
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;

  const stmt = db.prepare("INSERT INTO tasks (title, description) VALUES (?, ?)");
  const result = stmt.run(title, description);

  res.status(201).json({
    id: result.lastInsertRowid,
    title,
    description,
    completed: 0
  });
});

// UPDATE TASK
app.put('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const { title, description, completed } = req.body;

  const stmt = db.prepare(`
    UPDATE tasks
    SET title = COALESCE(?, title),
        description = COALESCE(?, description),
        completed = COALESCE(?, completed)
    WHERE id = ?
  `);

  const result = stmt.run(title, description, completed, id);

  if (result.changes === 0) {
    return res.status(404).json({ message: "Task not found" });
  }

  const updated = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

  res.json(updated);
});

// DELETE TASK
app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;

  const stmt = db.prepare("DELETE FROM tasks WHERE id = ?");
  const result = stmt.run(id);

  if (result.changes === 0) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(204).send();
});

module.exports = app;
