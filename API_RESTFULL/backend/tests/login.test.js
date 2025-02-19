require("dotenv").config();

const { faker } = require("@faker-js/faker");

const request = require("supertest");
const app = require("../ws-server");

//* Correct login
describe("POST /api/site  LogIn", () => {
  it("should authenticate", async () => {
    const BASIC_AUTH_CODE = Buffer.from(`${process.env.ADMIN_USER}:${process.env.ADMIN_PASSWORD}`).toString("base64");
    const res = await request(app)
      .post("/api/site/")
      .set("Authorization", `Basic ${BASIC_AUTH_CODE}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body).toHaveProperty("token");
  });
});

//! Login with no data
describe("POST /api/site  no data error", () => {
  it("should give error because of no data", async () => {
    const BASIC_AUTH_CODE = Buffer.from(':').toString("base64");
    const res = await request(app)
      .post("/api/site/")
      .set("Authorization", `Basic ${BASIC_AUTH_CODE}`);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
  });
});

//! Login with user not found
describe("POST /api/site  User not found error", () => {
  it("should give error with unknown user", async () => {
    const BASIC_AUTH_CODE = Buffer.from(`${faker.internet.username()}:${faker.internet.password()}`).toString("base64");
    const res = await request(app)
      .post("/api/site/")
      .set("Authorization", `Basic ${BASIC_AUTH_CODE}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error");
  });
});

//! Login with password incorrect
describe("POST /api/site  Password Incorrect error", () => {
  it("should give error with incorrect password user", async () => {
    const BASIC_AUTH_CODE = Buffer.from(`${process.env.ADMIN_USER}:${faker.internet.password()}`).toString("base64");
    const res = await request(app)
      .post("/api/site/")
      .set("Authorization", `Basic ${BASIC_AUTH_CODE}`);

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("error");
  });
});
