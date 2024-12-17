module.exports = app => {
    const categories = require("../controllers/categories.controller.js");
    const auth = require("../controllers/auth.js");

    var router = require("express").Router();

    // Create a category
    router.post("/",  auth.isAuthenticated, categories.create);

     //List all categories
    router.get("/",  auth.isAuthenticated, categories.findAll);

    // Get one category
    router.get("/:id",  auth.isAuthenticated, categories.findOne);

    // Update category
    router.put("/:id",  auth.isAuthenticated, categories.update);

    // Delete a category with id
    router.delete("/:id",  auth.isAuthenticated, categories.delete);

    app.use('/api/categories', router);

};