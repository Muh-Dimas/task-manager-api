const express = require('express');
const router = express.Router();

// "database" sederhana di memori
let tasks = [];
let nextId = 1;

// GET /tasks -> ambil semua task
router.get('/', (req, res) => {
  res.json(tasks);
});

// POST /tasks -> tambah task baru
router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTask = { id: nextId++, title, completed: false };
  tasks.push(newTask);
  return res.status(201).json(newTask);
});

// DELETE /tasks/:id -> hapus task
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks.splice(index, 1);
  return res.status(204).send();
});

// Export router dan fungsi util untuk testing
function reset() {
  tasks = [];
  nextId = 1;
}

module.exports = { router, reset };