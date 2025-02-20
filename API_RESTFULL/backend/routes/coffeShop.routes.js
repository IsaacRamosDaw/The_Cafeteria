module.exports = (app) => {
    const coffeShop = require("../controllers/coffeShop.controller.js");
    const auth = require("../controllers/auth.js"); 
    const multer = require('../middlewares/multer.js')

    const upload = multer({dest: '../public/images'})
    const authToken = require('../middlewares/auth.js')

    var router = require("express").Router();

    //List all coffeShops
    router.get("/", authToken, auth.isAuthenticated, coffeShop.findAll);

    // List one coffe shop
    router.get("/:id", authToken, auth.isAuthenticated, coffeShop.findOne);

    //Create an coffeShop
    router.post("/", upload.single('file'), authToken, coffeShop.create);

    // Update coffeShop
    router.put("/:id",  upload.single('file'), authToken, auth.isAuthenticated, coffeShop.update);

    //Delete coffeShop
    router.delete("/:id", authToken, auth.isAuthenticated, coffeShop.delete);

    app.use('/api/coffeShop', router);

};