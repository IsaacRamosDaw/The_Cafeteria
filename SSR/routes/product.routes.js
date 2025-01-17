module.exports = (app) => {
	const product = require("../controllers/product.controller.js");
    var router = require("express").Router();


		// List all products
		router.get("/", product.findAll);

		// Get one product
		router.get("/:id", product.findOne);

		//List products by category
		router.get("/categories/:id", product.findByCategory);

		//Get first product of a category
		router.get("/category/:id", product.findFirstOfCategory);

		// Count products
		router.get("/count/:id", product.countByCategory);

		//Create an Product
		router.post("/", product.create);

		// Update Product
		router.put("/:id", product.update);

		//Delete Product
		router.delete("/:id", product.delete);
		
	app.use('/api/products', router);
};  