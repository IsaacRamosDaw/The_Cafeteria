const request = require("supertest");
const app = require("../index");
const { admins: Admin } = require("../models");
const bcrypt = require("bcryptjs");

jest.mock("../controllers/auth", () => ({
    isAuthenticated: (req, res, next) => {
      req.user = { id: 1, role: "admin" };
      next();
    },
  }));  


jest.mock("../models", () => {
    const actualModels = jest.requireActual("../models");
    return {
      ...actualModels,
      admins: {
        update: jest.fn(),
        findByPk: jest.fn(),
      },
    };
  });
  

describe("PUT /admin/:id", () => {
    const adminId = 1;
    const token = "Bearer tokenValido";
    const hashedPassword = bcrypt.hashSync("nuevaClave");

    beforeEach(() => {
        Admin.update.mockClear();
    });

    test("Debe actualizar correctamente un admin", async () => {
        Admin.update.mockResolvedValue([1]);

        const res = await request(app)
            .put(`/admin/${adminId}`)
            .set("Authorization", token)
            .send({
                username: "nuevoAdmin",
                password: "nuevaClave",
            });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Admin was updated successfully.");
    });
});
