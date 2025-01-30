require("dotenv").config();

const { faker } = require("@faker-js/faker");

const request = require("supertest");
const app = require("../index");

// 200 - Solicitud exitosa (GET, PUT, DELETE)
// 201 - Recurso creado (POST)

describe("POST /api/students ", () => {
  it("should create student", async () => {
    
    let data = {
      age: faker.string.numeric(2),
      phone: faker.string.numeric(9),
      file: faker.system.commonFileName(),
    };

    const BASIC_AUTH_CODE = btoa(
      `${faker.person.firstName()}:${faker.internet.password()}`
    );

    const res = await request(app)
      .post("/api/student")
      .send(data)
      .set(file)
      .set("Authorization", `Basic ${BASIC_AUTH_CODE}`)
      .set("Content-Type", "application/x-www-form-urlencoded");

    expect(res.statusCode).toEqual(201); // Creacion de un nuevo recurso
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("student");
    expect(res.body.student).toHaveProperty("id");
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("wallet");
  });
});
