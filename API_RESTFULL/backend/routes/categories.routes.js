module.exports = app => {
    const categories = require("../controllers/categories.controller.js");
    const auth = require("../controllers/auth.js");

    var router = require("express").Router();

    // Create a category
    router.post("/",  categories.create);

     //List all categories
    router.get("/", categories.findAll);

    // Get one category
    router.get("/:id", categories.findOne);

    // Update category
    router.put("/:id", categories.update);

    // Delete a category with id
    router.delete("/:id", categories.delete);

    app.use('/api/categories', router);

};