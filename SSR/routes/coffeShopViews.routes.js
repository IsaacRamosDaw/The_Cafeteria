module.exports = (app) => {
    const coffeShop = require("../controllers/coffeShopView.controller");
    var router = require("express").Router();

    app.use('/api/view/coffeShop', router);

    //List all coffeShops
    router.get("/", coffeShop.findAll);

    // List one coffe shop
    router.get("/create", coffeShop.create);

    // Update coffeShop
    router.get("/find/:id", coffeShop.findOne);

    //Delete coffeShop
    router.get("/edit/:id", coffeShop.edit);
};