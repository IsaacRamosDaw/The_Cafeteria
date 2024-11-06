module.exports = (app) => {
    const admin = require("../controllers/admin.controller.js");
    // const auth = require("../controllers/auth.js");

    var router = require("express").Router();

    //Create an admin
    router.post("/", admin.create);

    //List all admins
    // router.get("/", auth.isAuthenticated, admin.findAll);

    router.get("/", admin.findAll);

    // Get one admin
    // router.get("/:id", auth.isAuthenticated, admin.findOne);

    router.get("/:id", admin.findOne);

    // Update admin
    // router.put("/:id", auth.isAuthenticated, admin.update);

    router.put("/:id", admin.update);


    //Delete admin
    router.delete("/:id", admin.delete);

    // Sign in
    // router.post("/signin", auth.signin);

    app.use('/api/admin', router);

};