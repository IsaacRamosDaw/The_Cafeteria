module.exports = (app) => {
    const product = require("../controllers/product.controller.js");

    var router = require("express").Router();

    //Create an Product
    router.post("/", product.create);

    //List products by category
    router.get("/category/:id", product.findByCategory);

    // List all products
    // router.get("/category/:id", product.findAll);

    // Get one student
    router.get("/:id", product.findOne);

    // Update Product
    router.put("/:id", product.update);

    //Delete Product
    router.delete("/:id",  product.delete);

    app.use('/api/products', router);

};  