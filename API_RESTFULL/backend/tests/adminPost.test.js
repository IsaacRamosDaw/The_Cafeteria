require("dotenv").config();
const faker = require("@faker-js/faker").faker;

const request = require("supertest");
const app = require("../index");

describe("POST /api/admin", () => {
    it("should create admin", async () => {  
        // let data = {
        //     name: faker.person.firstName(),
        //     email: faker.internet.email(),
        //     password: faker.internet.password(),
        // };

        const BASIC_AUTH_CODE = btoa(
            `${faker.person.firstName()}:${faker.internet.password()}`
        );

        const res = await request(app)
            .post("/api/admin")
            .set("Authorization", `Basic ${BASIC_AUTH_CODE}`)
            .set("Content-Type", "application/x-www-form-urlencoded");

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("admin");
        expect(res.body.admin).toHaveProperty("id");
        expect(res.body).toHaveProperty("access_token");
    });
});
