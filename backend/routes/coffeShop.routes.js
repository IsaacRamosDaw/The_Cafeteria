module.exports = (app) => {
    const coffeShop = require("../controllers/coffeShop.controller.js");
    const auth = require("../controllers/auth.js"); 
    var upload = require("../multer/upload.js");

    var router = require("express").Router();

    //Create an coffeShop
    router.post("/", coffeShop.create);

    router.put("/upload/:id" , upload.single('file'), coffeShop.imgUpdate);

    //List all coffeShops
    router.get("/", auth.isAuthenticated, coffeShop.findAll);

    // Update coffeShop
    router.put("/:id",  upload.single('file'), auth.isAuthenticated, coffeShop.update);

    //Delete coffeShop
    router.delete("/:id", auth.isAuthenticated, coffeShop.delete);

    app.use('/api/coffeShop', router);

};