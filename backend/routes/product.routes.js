module.exports = (app) => {
    const product = require("../controllers/product.controller");
    const auth = require("../controllers/auth.js"); 

    var router = require("express").Router();

    //Create an coffeShop
    router.post("/", auth.isAuthenticated, product.create);

    //List all coffeShops
    router.get("/", auth.isAuthenticated, product.findAll);

    // Get one student
    router.get("/:id", auth.isAuthenticated, product.findOne);

    // Update coffeShop
    router.put("/:id", auth.isAuthenticated, product.update);

    //Delete coffeShop
    router.delete("/:id", auth.isAuthenticated, product.delete);

    app.use('/api/coffeShop', router);

};