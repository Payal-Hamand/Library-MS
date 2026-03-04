// const request = require("supertest");
// const app = require("../../index");

// describe("Auth API", () => {

//   it("POST /auth/register - should register a user", async () => {
//     const res = await request(app)
//       .post("/auth/register")
//       .send({
//         username: "testuser1",
//         password: "123456"
//       });

//     expect(res.statusCode).toBe(201);
//   });

//   it("POST /auth/login - should login user", async () => {
//     const res = await request(app)
//       .post("/auth/login")
//       .send({
//         username: "testuser1",
//         password: "123456"
//       });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.token).toBeDefined();
//   });

// });


const request = require("supertest");
const app = require("../../index");

describe("Auth API", () => {

  const username = "testuser_" + Date.now();

  it("POST /auth/register - should register a user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        username: username,
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
  });

  it("POST /auth/login - should login user", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        username: username,
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

});