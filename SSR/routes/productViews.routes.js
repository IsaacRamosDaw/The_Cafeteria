module.exports = (app) => {
  const product = require("../controllers/productView.controller.js");

  var router = require("express").Router();

    // Get all products views
    router.get("/", product.findAll);

    // Retrieve one product
    router.get("/find/:id", product.findOne);

    // Create a products view
    router.get("/create", product.create);

    // Edit a products view
    router.get("/edit/:id", product.edit);

  app.use("/api/view/products", router);
};
