const request = require("supertest");
const faker = require("@faker-js/faker").faker;
const app = require("../index");

describe("POST /api/admin - Error Cases", () => {
    
    it("should fail when required fields are missing", async () => {
        const res = await request(app)
            .post("/api/admin")
            .set("Content-Type", "application/x-www-form-urlencoded");

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message", "Content can not be empty!");
    });

    it("should fail to create an admin with incorrect password for existing user", async () => {
        const username = faker.person.firstName();
        const password = faker.internet.password();

        await request(app)
            .post("/api/admin")
            .send({ username, password })
            .set("Content-Type", "application/x-www-form-urlencoded");

        const res = await request(app)
            .post("/api/admin")
            .send({ username, password: "wrong_password" })
            .set("Content-Type", "application/x-www-form-urlencoded");

        expect(res.statusCode).toBe(401);
        expect(res.text).toBe("Password not valid!");
    });

    it("should allow creation of a new admin even if Basic Auth is incorrect", async () => {
        const BASIC_AUTH_CODE = Buffer.from("invalidUser:invalidPass").toString("base64");

        const res = await request(app)
            .post("/api/admin")
            .set("Authorization", `Basic ${BASIC_AUTH_CODE}`)
            .set("Content-Type", "application/x-www-form-urlencoded")
            .send({ username: faker.person.firstName(), password: faker.internet.password() });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("access_token");
    });

});
