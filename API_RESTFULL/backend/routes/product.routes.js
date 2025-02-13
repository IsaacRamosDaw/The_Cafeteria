module.exports = (app) => {
    const product = require("../controllers/product.controller.js");
	const auth = require("../controllers/auth.js");
    var router = require("express").Router();

    // List all products
    router.get("/", auth.isAuthenticated, product.findAll);

    // Get one product
    router.get("/:id", auth.isAuthenticated, product.findOne);

    //List products by category
    router.get("/categories/:id", product.findByCategory);

    //Get first product of a category
    router.get("/category/:id", product.findFirstOfCategory);

    // Count products
    router.get("/count/:id", product.countByCategory);

    //Create an Product
    router.post("/", auth.isAuthenticated, product.create);

    // Update Product
    router.put("/:id", auth.isAuthenticated, product.update);

    //Delete Product
    router.delete("/:id",  auth.isAuthenticated, product.delete);

    app.use('/api/products', router);
};  