module.exports = (app) => {
  const order = require("../controllers/order.controller.js");
  var router = require("express").Router();

  // Create a orders 
  router.post("/", order.create);

  // Create a orders 
  router.post("/:studentId/:id", order.createByUrl);

  // Retrieve all orders 
  router.get("/", order.findAll);
  
  // Retrieve one order
  router.get("/:id", order.findOne);

  // Retrieve order from one student
  router.get("/:student/:id", order.findAllByStudent);

  // Delete orders
  router.delete("/:id", order.delete);

  app.use("/api/orders", router);
}