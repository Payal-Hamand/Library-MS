const request = require("supertest");
const app = require("../../index");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

let adminToken;
let bookId;
const adminUsername = "admin_test_" + Date.now(); // unique username

describe("Books API", () => {

  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      username: adminUsername,
      password: hashedPassword,
      role: "admin",
    });

    const loginRes = await request(app)
      .post("/auth/login")
      .send({
        username: adminUsername,
        password: "admin123"
      });

    adminToken = loginRes.body.token;
  });

  it("GET /books - should fetch books", async () => {
    const res = await request(app)
      .get("/books")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });

  it("POST /books - should create book", async () => {
    const res = await request(app)
      .post("/books")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Test Book",
        author: "Test Author",
        publishedYear: 2024
      });

    expect(res.statusCode).toBe(201);
    bookId = res.body.data._id;
  });

  it("PUT /books/:id - should update book", async () => {
    const res = await request(app)
      .put(`/books/${bookId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Updated Book",
        author: "Updated Author",
        publishedYear: 2025
      });

    expect(res.statusCode).toBe(200);
  });

  it("PATCH /books/:id/status - should update status", async () => {
    const res = await request(app)
      .patch(`/books/${bookId}/status`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        status: "borrowed"
      });

    expect(res.statusCode).toBe(200);
  });

  it("DELETE /books/:id - should delete book", async () => {
    const res = await request(app)
      .delete(`/books/${bookId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });

});