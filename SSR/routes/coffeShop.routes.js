module.exports = (app) => {
    const coffeShop = require("../controllers/coffeShop.controller.js");
    const auth = require("../controllers/auth.js"); 
    var upload = require("../multer/upload.js");

    var router = require("express").Router();

    //List all coffeShops
    router.get("/", auth.isAuthenticated, coffeShop.findAll);

    // List one coffe shop
    router.get("/:id", auth.isAuthenticated, coffeShop.findOne);

    //Create an coffeShop
    router.post("/", coffeShop.create);

    router.put("/upload/:id" , upload.single('file'), coffeShop.imgUpdate);

    // Update coffeShop
    router.put("/:id", coffeShop.update);

    //Delete coffeShop
    router.delete("/:id", coffeShop.delete);

    app.use('/api/coffeShop', router);

};