require("dotenv").config();
const bcrypt = require("bcrypt");

const request = require("supertest");
const app = require("../index.js");

describe("POST /api/site  LogIn", () => {
  it("should authenticate", async () => {
    const BASIC_AUTH_CODE = btoa(
      `${process.env.ADMIN_USER}:${process.env.ADMIN_PASSWORD}`
    );
    const res = await request(app)
      .post("/api/site/")
      .set("Authorization", `Basic ${BASIC_AUTH_CODE}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body).toHaveProperty("token");
  });
});

describe("POST /api/site  ErrorLogin", () => {
  it("should give error while login", async () => {
    const BASIC_AUTH_CODE = btoa("John Doe:1234");
    const res = await request(app)
      .post("/api/site/")
      .set("Authorization", `Basic ${BASIC_AUTH_CODE}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error");
  });
});
