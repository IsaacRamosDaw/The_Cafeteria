require("dotenv").config();
const faker = require("@faker-js/faker").faker;
const request = require("supertest");
const app = require("../ws-server");
const { admins: Admin } = require("../models");
const bcrypt = require("bcryptjs");

// let ADMIN_ID = 1;
// let ADMIN_TOKEN = "";
// let BASIC_AUTH_CODE;

// Asegúrate de que utils esté correctamente importado
const utils = require("../utils"); // Añade la ruta correcta de utils

describe("GET /admin (List All)", () => {
    it("should return all admins when authenticated with the 'admin' role", async () => {
        const admin1 = await Admin.create({ username: "admin1", password: "password", role: "admin" });
        const admin2 = await Admin.create({ username: "admin2", password: "password", role: "admin" });

        const token = utils.generateToken({ id: admin1.id, role: "admin" });

        const res = await request(app)
            .get("/api/admin")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json");

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(2);
    });
});

describe("GET /admin (List All Failed)", () => {
    it("should return 403 if the user does not have admin role", async () => {
      const user = await Admin.create({ username: "user", password: "password", role: "user" });
  
      const token = utils.generateToken({ id: user.id, role: "user" });
  
      const res = await request(app)
        .get("/api/admin")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json");
  
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("error", "Invalid user type");
    });
  
    it("should return 403 if no token is provided", async () => {
      const res = await request(app)
        .get("/api/admin")
        .set("Authorization", `Bearer `)
        .set("Content-Type", "application/json");
  
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty("message", "Formato de autorización no válido.");
    });
  });
  

describe("POST /api/admin", () => {
    it("should create admin", async () => {
        const BASIC_AUTH_CODE = Buffer.from(
            `${faker.person.firstName()}:${faker.internet.password()}`
        ).toString("base64");

        const res = await request(app)
            .post("/api/admin")
            .set("Authorization", `Basic ${BASIC_AUTH_CODE}`)
            .set("Content-Type", "application/json")
            .send({
                username: faker.person.firstName(),
                password: faker.internet.password(),
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("admin");
        expect(res.body.admin).toHaveProperty("id");
        expect(res.body).toHaveProperty("access_token");
    });
});

describe("POST /api/admin - Error Cases", () => {

    it("should fail when required fields are missing", async () => {
        const res = await request(app)
            .post("/api/admin")
            .set("Content-Type", "application/json")
            .send({});

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message", "Content can not be empty!");
    });

    it("should fail to create an admin with incorrect password for existing user", async () => {
        const username = faker.person.firstName();
        const password = faker.internet.password();

        await request(app)
            .post("/api/admin")
            .send({ username, password })
            .set("Content-Type", "application/json");

        const res = await request(app)
            .post("/api/admin")
            .send({ username, password: "wrong_password" })
            .set("Content-Type", "application/json");

        expect(res.statusCode).toBe(401);
        expect(res.text).toBe("Password not valid!");
    });

    it("should allow creation of a new admin even if Basic Auth is incorrect", async () => {
        const BASIC_AUTH_CODE = Buffer.from("invalidUser:invalidPass").toString("base64");

        const res = await request(app)
            .post("/api/admin")
            .set("Authorization", `Basic ${BASIC_AUTH_CODE}`)
            .set("Content-Type", "application/json")
            .send({
                username: faker.person.firstName(),
                password: faker.internet.password(),
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("access_token");
    });
});

describe("PUT /admin/:id", () => {
    it("should update admin with id", async () => {
        const newUsername = faker.internet.username();
        const newPassword = faker.internet.password();
        const hashedPassword = bcrypt.hashSync(newPassword);

        const newAdmin = await Admin.create({
            username: "adminOld",
            password: hashedPassword,
            role: "admin",
        });

        const adminId = newAdmin.id;

        const token = utils.generateToken({ id: adminId, role: "admin" });

        const res = await request(app)
            .put(`/api/admin/${adminId}`)
            .send({
                username: newUsername,
                password: newPassword,
            })
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json");

        console.log("Response Status Code:", res.statusCode);
        console.log("Response Body:", res.body);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Admin was updated successfully.");
    });
});


describe("PUT /admin/:id (Failures)", () => {

    it("should return 400 if username is missing", async () => {
        const admin = await Admin.create({ username: "admin", password: "password", role: "admin" });
        const token = utils.generateToken({ id: admin.id, role: "admin" });

        const res = await request(app)
            .put(`/api/admin/${admin.id}`)
            .send({ password: "newPass" })
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json");

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("message", "The name field cannot be empty.");
    });

    it("should return 400 if password is missing", async () => {
        const admin = await Admin.create({ username: "admin", password: "password", role: "admin" });
        const token = utils.generateToken({ id: admin.id, role: "admin" });

        
        const res = await request(app)
            .put(`/api/admin/${admin.id}`)
            .send({ username: "newUser" })
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json");

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("message", "The password field cannot be empty.");
    });



    // it("should return 404 if admin does not exist", async () => {
    //     const realAdmin = await Admin.create({ username: "adminTest", password: "password", role: "admin" });
    //     const fakeAdminId = realAdmin.id + 100;
    //     const token = utils.generateToken({ id: fakeAdminId, role: "admin" });

    //     const res = await request(app)
    //       .put(`/api/admin/${fakeAdminId}`)
    //       .send({ username: "newUser", password: "newPass" })
    //       .set("Authorization", `Bearer ${token}`)
    //       .set("Content-Type", "application/json");

    //     console.log("RESPONSE STATUS:", res.statusCode);
    //     console.log("RESPONSE BODY:", res.body);

    //     expect(res.statusCode).toEqual(404);
    //     expect(res.body).toHaveProperty("message", `Cannot update Admin with id=${fakeAdminId}. Admin not found.`);
    // });
});

describe("DELETE /admin/:id", () => {
    it("should delete an existing admin", async () => {
        const admin = await Admin.create({ username: "adminToDelete", password: "password", role: "admin" });

        const token = utils.generateToken({ id: admin.id, role: "admin" });

        const res = await request(app)
            .delete(`/api/admin/${admin.id}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Admin was deleted successfully.");

        const deletedAdmin = await Admin.findByPk(admin.id);
        expect(deletedAdmin).toBeNull();
    });
});

describe("DELETE /admin/:id (Failures)", () => {
    it("should return 404 if admin does not exist", async () => {
        const realAdmin = await Admin.create({ username: "adminTest", password: "password", role: "admin" });
        const fakeAdminId = realAdmin.id + 100;
        const token = utils.generateToken({ id: fakeAdminId, role: "admin" });

        const res = await request(app)
            .delete(`/api/admin/${fakeAdminId}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json");

        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty("message", "Admin not found.");
    });
});




