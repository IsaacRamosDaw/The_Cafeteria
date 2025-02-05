module.exports = (app) => {
  const order = require("../controllers/order.controller.js");
  const auth = require("../controllers/auth.js");
  const multer = require("../middlewares/multer.js");

  const upload = multer({ dest: "../public/images/worker" });
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

  // Update worker
	// router.put("/:id", authToken, auth.isAuthenticated, order.update);

  // Delete orders
  router.delete("/", authToken, auth.isAuthenticated, order.delete);

  app.use("/api/orders", router);
};
