module.exports = app => {
    const categories = require("../controllers/categories.controller.js");

    var router = require("express").Router();

    // Crear una categoría
    router.post("/", categories.create);

    // Listar todas las categorías
    router.get("/", categories.findAll);

    // Conseguir una
    router.get("/:id", categories.findOne);

    // Actualizar categoría
    router.put("/:id", categories.update);

    // Eliminar una categoría por su id
    router.delete("/:id", categories.delete);

    app.use('/api/categories', router);

};