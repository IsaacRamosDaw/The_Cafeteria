module.exports = (app) => {
    const product = require("../controllers/product.controller.js");
	const auth = require("../controllers/auth.js");
    const multer = require('../middlewares/multer.js')

    const upload = multer({dest: '../public/images/product'})
	const authToken = require('../middlewares/auth.js')

	var router = require("express").Router();

    // List all products
    router.get("/", authToken, auth.isAuthenticated, product.findAll);

    // Get one product
    router.get("/:id", authToken, auth.isAuthenticated, product.findOne);

    //List products by category
    router.get("/categories/:id", authToken, product.findByCategory);

    //Get first product of a category
    router.get("/category/:id", authToken, product.findFirstOfCategory);

    // Count products
    router.get("/count/:id", authToken, product.countByCategory);

    //Create an Product
    router.post("/", upload.single('file'), authToken, auth.isAuthenticated, product.create);

    // Update Product
    router.put("/:id", upload.single('file'), authToken, auth.isAuthenticated, product.update);

    //Delete Product
    router.delete("/:id", authToken,  auth.isAuthenticated, product.delete);

    app.use('/api/products', router);
};  