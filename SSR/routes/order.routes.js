module.exports = (app) => {
  const order = require("../controllers/order.controller.js");
	const auth = require("../controllers/auth.js");
  var router = require("express").Router();

  router.post("/", auth.isAuthenticated, order.create);

  // Retrieve all orders 
  router.get("/", auth.isAuthenticated, order.findAll);
  
  // Retrieve one order
  router.get("/:id", auth.isAuthenticated, order.findOne);

  // Retrieve order from one student
  router.get("/:student/:id", auth.isAuthenticated, order.findAllByStudent);

  // Delete orders
  router.delete("/", auth.isAuthenticated, order.delete);

  app.use("/api/orders", auth.isAuthenticated, router);
}