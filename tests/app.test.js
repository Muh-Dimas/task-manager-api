const request = require("supertest");
const app = require("../src/app");

// Reset data sebelum setiap test
beforeEach(() => {
  app.reset();
});

describe("Task Manager API", () => {

  // ============================
  // GET /tasks
  // ============================
  test("GET /tasks harus mengembalikan array kosong", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  // ============================
  // POST /tasks
  // ============================
  test("POST /tasks harus membuat task baru", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({
        title: "Task 1",
        description: "Deskripsi task 1"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("title", "Task 1");
    expect(res.body).toHaveProperty("description", "Deskripsi task 1");
    expect(res.body).toHaveProperty("completed", false);
  });

  // ============================
  // PUT /tasks/:id
  // ============================
  test("PUT /tasks/:id harus mengupdate task", async () => {

    // Buat task dulu
    await request(app)
      .post("/tasks")
      .send({
        title: "Task awal",
        description: "Deskripsi awal"
      });

    // Update task id=1
    const res = await request(app)
      .put("/tasks/1")
      .send({
        title: "Task sudah diupdate",
        completed: true
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("title", "Task sudah diupdate");
    expect(res.body).toHaveProperty("completed", true);
    expect(res.body.description).toBe("Deskripsi awal");
  });

  // ============================
  // DELETE /tasks/:id
  // ============================
  test("DELETE /tasks/:id harus menghapus task", async () => {

    await request(app)
      .post("/tasks")
      .send({
        title: "Task 1",
        description: "Deskripsi"
      });

    const res = await request(app).delete("/tasks/1");

    expect(res.statusCode).toBe(204);

    // Pastikan sudah terhapus
    const check = await request(app).get("/tasks");
    expect(check.body).toEqual([]);
  });

});
