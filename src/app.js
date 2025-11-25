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

// POST
app.post("/tasks", (req, res) => {
  const task = { id: tasks.length + 1, ...req.body };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id == id);
  if (index === -1) return res.status(404).send("Not found");

  tasks[index] = { id: Number(id), ...req.body };
  res.json(tasks[index]);
});

// DELETE
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id != id);
  res.sendStatus(204);
});

module.exports = app;