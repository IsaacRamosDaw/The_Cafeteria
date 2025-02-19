const { faker } = require("@faker-js/faker");

const request = require("supertest");
const app = require("../ws-server");

const db = require("../models");
const Product = db.product;
const Category = db.categories;
const Worker = db.worker;

const utils = require("../utils");
const path = require('path');

const name = "Donut"
const description = "pedazo de donut"
const price = 3

let WORKER_TOKEN = "";
let PRODUCT_ID = 1;

beforeAll(async () => {
  const data = await Worker.findOne({
    where: { username: "worker1" },
  });

  WORKER_TOKEN = utils.generateToken(data);
});
// 200 - Solicitud exitosa (GET, PUT, DELETE)
// 201 - Recurso creado (POST)

describe("POST /api/products", () => {
  it("should create a product", async () => {
    const newCategory = await Category.create(
      {
        name: "myCategoryTest"
      })
    const categoryId = await Category.findOne({ where: { name: "myCategoryTest" } })
    const resProduct = await request(app)

      .post("/api/products/")
      .field("name", name)
      .field("description", description)
      .field("price", price)
      .attach("file", path.join(__dirname, "./files/test-file.jpg"))
      .field("CategoryId", categoryId.id)
      .set("Authorization", `Bearer ${WORKER_TOKEN}`);

    expect(resProduct.statusCode).toEqual(201)
    expect(resProduct.body).toHaveProperty("message")
    expect(resProduct.body).toHaveProperty("product")
    expect(resProduct.body.product).toHaveProperty("id")
  });
});

describe("GET /api/products", () => {
  it("should show all products", async () => {
    const res = await request(app)
      .get("/api/products/")
      .set("Authorization", `Bearer ${WORKER_TOKEN}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0]).toHaveProperty("price");
  });
});

describe("PUT /api/products ", () => {
  it("should update product with id " + PRODUCT_ID, async () => {
    const res = await request(app)
      .put("/api/products/" + PRODUCT_ID)
      .field("name", "producto cambiado")
      .field("price", 2)
      .field("description", "nueva descripción del product")
      .set("Authorization", `Bearer ${WORKER_TOKEN}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("Product was updated successfully.");
  });
});

describe("DELETE /api/products", () => {
  it("delete delete student with id " + PRODUCT_ID, async () => {
    const newCategory = await Category.create(
      {
        name: "myCategoryTest"
      })
      

    const newProduct = await Product.create(
      {
        name: "myProductTest",
        description: "myProductDescriptionTest",
        file: "",
        price: 5
      })

    const newProductObj = await Category.findOne({ where: { name: "myProductTest" } })

    const res = await request(app)
      .delete("/api/products/" + newProduct.id)
      .set("Authorization", `Bearer ${WORKER_TOKEN}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });
});