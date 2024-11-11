module.exports = (app) => {
    const admin = require("../controllers/admin.controller.js");
    const auth = require("../controllers/auth.js"); 

    var router = require("express").Router();

    router.post('/signin', (req, res) => auth.signin(req, res, 'admin'));
    
    //Create an admin
    router.post("/", admin.create);

    //List all admins
    router.get("/", auth.isAuthenticated, admin.findAll);

    // Get one admin
    router.get("/:id", auth.isAuthenticated, admin.findOne);

    // Update admin
    router.put("/:id", auth.isAuthenticated, admin.update);

    //Delete admin
    router.delete("/:id", auth.isAuthenticated, admin.delete);

    app.use('/api/admin', router);

};