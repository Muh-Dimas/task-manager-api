const express = require("express");
const app = express();
app.use(express.json());

let tasks = [];

// Reset data untuk test
app.reset = () => {
  tasks.length = 0;
};

// GET
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST /tasks
app.post("/tasks", (req, res) => {
  const { title, description } = req.body;

  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    completed: false,   // <= default
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const task = tasks.find((t) => t.id == id);
  if (!task) return res.status(404).send("Not found");

  // hanya update field yang diperbolehkan
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  // description TIDAK diubah
  res.json(task);
});

// DELETE
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id != id);
  res.sendStatus(204);
});

module.exports = app;