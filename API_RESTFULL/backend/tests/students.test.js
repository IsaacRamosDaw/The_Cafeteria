const { faker } = require("@faker-js/faker");

const request = require("supertest");
const app = require("../ws-server");

const db = require("../models");
const Student = db.student;

const utils = require("../utils");
const path = require('path')

let STUDENT_ID = 1;
let STUDENT_TOKEN = "";
let BASIC_AUTH_CODE;

beforeAll(async () => {
  const data = await Student.findOne({
    where: { username: "student1" },
  });
  STUDENT_ID = data.id;
  STUDENT_TOKEN = utils.generateToken(data);

  let username = faker.internet.username();
  let password = faker.internet.password();

  BASIC_AUTH_CODE = Buffer.from(`${username}:${password}`).toString("base64");
});

// 200 - Solicitud exitosa (GET, PUT, DELETE)
// 201 - Recurso creado (POST)

describe("POST /api/students ", () => {
  it("should create student", async () => {
    const res = await request(app)
      .post("/api/student/")
      .field("age", faker.string.numeric(2))
      .field("phone", faker.string.numeric(9))
      .attach("file",  path.join(__dirname, "./files/test-file.jpg"))
      .set("Authorization", `Basic ${BASIC_AUTH_CODE}`);

    expect(res.statusCode).toEqual(201); // Creacion de un nuevo recurso
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("student");
    expect(res.body.student).toHaveProperty("id");
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("wallet");
  });
});

describe("GET /api/students", () => {
  it("should show all students", async () => {
    const res = await request(app)
      .get("/api/student/")
      .set("Authorization", `Bearer ${STUDENT_TOKEN}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
    // expect(res.body[0]).toHaveProperty("username");
  });
});

describe("PUT /api/students ", () => {
  it("should update student with id " + STUDENT_ID, async () => {
    const res = await request(app)
      .put("/api/student/" + STUDENT_ID)
      .field("username", faker.internet.username())
      .field("password", faker.internet.password())
      .field("age", faker.string.numeric(2))
      .field("phone", faker.string.numeric(9))
      .attach("file",  path.join(__dirname, "./files/test-file.jpg"))
      .set("Authorization", `Bearer ${STUDENT_TOKEN}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("Student was updated successfully.");
  });
});

describe("DELETE /api/students", () => {
  it("should delete student with id " + STUDENT_ID, async () => {

    let username = faker.internet.username();

    const newStudent = await Student.create({
      username: username,
      password: faker.internet.password(),
      age: faker.string.numeric(2),
      phone: faker.string.numeric(9),
    });

    let newStudentDB = await Student.findOne({ where: { username: username } });

    let deleteToken = utils.generateToken(newStudentDB);

    const res = await request(app)
      .delete("/api/student/" + newStudentDB.id)
      .set("Authorization", `Bearer ${deleteToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });
});
