const { faker } = require("@faker-js/faker");

const request = require("supertest");
const app = require("../ws-server");

const db = require("../models");
const Worker = db.worker;

const utils = require("../utils");
const path = require('path')

let WORKER_ID = 1;
let WORKER_TOKEN = "";
let BASIC_AUTH_CODE;

beforeAll(async () => {
  const data = await Worker.findOne({
    where: { username: "worker1" },
  });
  WORKER_ID = data.id;
  WORKER_TOKEN = utils.generateToken(data);

  let username = faker.internet.username();
  let password = faker.internet.password();

  BASIC_AUTH_CODE = Buffer.from(`${username}:${password}`).toString("base64");
});

// 200 - Solicitud exitosa (GET, PUT, DELETE)
// 201 - Recurso creado (POST)

describe("POST /api/workers ", () => {
  it("should create worker", async () => {
    const res = await request(app)
      .post("/api/worker/")
      .field("age", faker.string.numeric(2))
      .field("phone", faker.string.numeric(9))
      .attach("file",  path.join(__dirname, "./files/test-file.jpg"))
      .set("Authorization", `Basic ${BASIC_AUTH_CODE}`);

    expect(res.statusCode).toEqual(201); // Creacion de un nuevo recurso
    expect(res.body).toHaveProperty("worker");
    expect(res.body.worker).toHaveProperty("id");
    expect(res.body).toHaveProperty("token");
  });
});

describe("GET /api/workers", () => {
  it("should show all workers", async () => {
    const res = await request(app)
      .get("/api/worker/")
      .set("Authorization", `Bearer ${WORKER_TOKEN}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).not.toEqual([]);
    expect(res.body[0]).toHaveProperty("id");
  });
});

describe("PUT /api/workers ", () => {
  it("should update worker with id " + WORKER_ID, async () => {
    const res = await request(app)
      .put("/api/worker/" + WORKER_ID)
      .field("username", faker.internet.username())
      .field("password", faker.internet.password())
      .field("age", faker.string.numeric(2))
      .field("phone", faker.string.numeric(9))
      .attach("file",  path.join(__dirname, "./files/test-file.jpg"))
      .set("Authorization", `Bearer ${WORKER_TOKEN}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("Worker was updated successfully.");
  });
});

describe("DELETE /api/workers", () => {
  it("should delete worker with id " + WORKER_ID, async () => {

    let username = faker.internet.username();

    const newworker = await Worker.create({
      username: username,
      password: faker.internet.password(),
      age: faker.string.numeric(2),
      phone: faker.string.numeric(9),
    });

    let newworkerDB = await Worker.findOne({ where: { username: username } });

    let deleteToken = utils.generateToken(newworkerDB);

    const res = await request(app)
      .delete("/api/worker/" + newworkerDB.id)
      .set("Authorization", `Bearer ${deleteToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });
});
