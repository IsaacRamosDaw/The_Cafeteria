module.exports = (app) => {
  const order = require("../controllers/order.controller.js");
  const auth = require("../controllers/auth.js");

  const authToken = require("../middlewares/auth.js");

  var router = require("express").Router();

  // Retrieve all orders
  router.get("/", authToken, auth.isAuthenticated, order.findAll);
  
  // Retrieve one order
  router.get("/:id", authToken, auth.isAuthenticated, order.findOne);

  // Retrieve order from one student
  router.get("/:student/:id", authToken, auth.isAuthenticated, order.findAllByStudent);

  // Create a order
  router.post("/", authToken, auth.isAuthenticated, order.create);

  // Update order
	router.put("/:id", authToken, auth.isAuthenticated, order.update);

  // Finish a order
	router.put("/finish/:id", authToken, auth.isAuthenticated, order.finish);

  // Delete orders
  router.delete("/:id", authToken, auth.isAuthenticated, order.delete);

  app.use("/api/orders", router);
};
