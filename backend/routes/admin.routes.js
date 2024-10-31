module.exports = app => {
    const admin = require("../controllers/admin.controller.js");

    var router = require("express").Router();

    //Create an admin
    router.post("/", admin.createCategory);

    //List all admins
    router.get("/", admin.findAll);

    // Update admin
    router.put("/:id", admin.update);

    //Delete admin
    router.delete("/:id", admin.delete);

    app.use('/api/admin', router);

};