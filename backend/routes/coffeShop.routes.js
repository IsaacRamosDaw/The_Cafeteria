module.exports = (app) => {
    const coffeShop = require("../controllers/coffeShop.controller.js");

    var router = require("express").Router();

    //Create an coffeShop
    router.post("/", coffeShop.create);

    //List all coffeShops
    router.get("/", coffeShop.findAll);

    // Update coffeShop
    router.put("/:id", coffeShop.update);

    //Delete coffeShop
    router.delete("/:id", coffeShop.delete);

    app.use('/api/coffeShop', router);

};