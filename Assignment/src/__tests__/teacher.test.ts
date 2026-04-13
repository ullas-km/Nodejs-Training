import request from "supertest";
import app from "../app";

describe("Teacher API - CRUD Tests", () => {
  
  it("should get all teachers", async () => {
    const res = await request(app).get("/api/teachers");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get teacher by id", async () => {
    const res = await request(app).get("/api/teachers/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("teacher_id");
  });

  it("should return 404 for invalid teacher id", async () => {
    const res = await request(app).get("/api/teachers/999999");

    expect(res.statusCode).toBe(404);
  });

  it("should create a teacher", async () => {
    const res = await request(app)
      .post("/api/teachers")
      .send({
        teacher_name: "John Doe"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("teacher_id");
  });

  it("should update a teacher", async () => {
    const res = await request(app)
      .put("/api/teachers/1")
      .send({
        teacher_name: "Updated Name"
      });

    expect(res.statusCode).toBe(200);
  });

  it("should return 404 when updating invalid teacher", async () => {
    const res = await request(app)
      .put("/api/teachers/999999")
      .send({
        teacher_name: "Test"
      });

    expect(res.statusCode).toBe(404);
  });

  it("should delete a teacher", async () => {
    const res = await request(app).delete("/api/teachers/1");

    expect(res.statusCode).toBe(200);
  });
});