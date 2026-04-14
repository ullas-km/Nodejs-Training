// import request from "supertest";
// import app from "../app";

// describe("Teacher API - CRUD Tests", () => {
  
//   it("should get all teachers", async () => {
//     const res = await request(app).get("/api/teachers");

//     expect(res.statusCode).toBe(200);
//     expect(Array.isArray(res.body)).toBe(true);
//   });

//   it("should get teacher by id", async () => {
//     const res = await request(app).get("/api/teachers/3");

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty("teacher_id");
//   });

//   it("should return 404 for invalid teacher id", async () => {
//     const res = await request(app).get("/api/teachers/999999");

//     expect(res.statusCode).toBe(404);
//   });

//   it("should create a teacher", async () => {
//     const res = await request(app)
//       .post("/api/teachers")
//       .send({
//         teacher_name: "John Doe"
//       });

//     expect(res.statusCode).toBe(201);
//     expect(res.body).toHaveProperty("teacher_id");
//   });

//   it("should update a teacher", async () => {
//     const res = await request(app)
//       .put("/api/teachers/3")
//       .send({
//         teacher_name: "Updated Name"
//       });

//     expect(res.statusCode).toBe(200);
//   });

//   it("should return 404 when updating invalid teacher", async () => {
//     const res = await request(app)
//       .put("/api/teachers/999999")
//       .send({
//         teacher_name: "Test"
//       });

//     expect(res.statusCode).toBe(404);
//   });

//   it("should delete a teacher", async () => {
//     const res = await request(app).delete("/api/teachers/3");

//     expect(res.statusCode).toBe(200);
//   });
// });

import request from "supertest";
import app from "../app";

describe("Teacher API - CRUD Tests", () => {
  let teacherId: number;

  it("should create a teacher", async () => {
    const res = await request(app)
      .post("/api/teachers")
      .send({ teacher_name: "John Doe" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("teacher_id");

    teacherId = res.body.teacher_id; // ✅ store dynamic id
  });

  it("should get teacher by id", async () => {
    const res = await request(app).get(`/api/teachers/${teacherId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.teacher_id).toBe(teacherId);
  });

  it("should update teacher", async () => {
    const res = await request(app)
      .put(`/api/teachers/${teacherId}`)
      .send({ teacher_name: "Updated Name" });

    expect(res.statusCode).toBe(200);
  });

  it("should get all teachers", async () => {
    const res = await request(app).get("/api/teachers");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should delete teacher", async () => {
    const res = await request(app).delete(`/api/teachers/${teacherId}`);

    expect(res.statusCode).toBe(200);
  });

  it("should return 404 after delete", async () => {
    const res = await request(app).get(`/api/teachers/${teacherId}`);

    expect(res.statusCode).toBe(404);
  });
});