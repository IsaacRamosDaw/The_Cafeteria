module.exports = (app) => {
  const orderLine = require("../controllers/orderLine.controller.js");
  const auth = require("../controllers/auth.js");

  const authToken = require("../middlewares/auth.js");

  var router = require("express").Router();

  // Retrieve all orderLines
  router.get("/", authToken, auth.isAuthenticated, orderLine.findAll);
  
  // Retrieve one order line
  router.get("/:id", authToken, auth.isAuthenticated, orderLine.findOne);

  // Get order lines by order
  router.get("/orders/:id", authToken, auth.isAuthenticated, orderLine.findByOrders);

  // Create a order line
  router.post("/", authToken, auth.isAuthenticated, orderLine.create);
  
  // Create a lot of order lines once
  router.post("/lines/", authToken, auth.isAuthenticated, orderLine.bulkCreate);

  // Update order line
	router.put("/:id", authToken, auth.isAuthenticated, orderLine.update);

  // Delete order lines
  router.delete("/:id", authToken, auth.isAuthenticated, orderLine.delete);

  // Delete order lines by order id
  router.delete("/lines/:id", authToken, auth.isAuthenticated, orderLine.deleteByOrder);

  app.use("/api/orderLine", router);
};
