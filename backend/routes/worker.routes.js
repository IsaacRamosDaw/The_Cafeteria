module.exports = (app) => {
    const worker = require("../controllers/worker.controller.js");

    var router = require("express").Router();

    //Create a worker
    router.post("/", worker.create);

    //List all workers
    router.get("/", worker.findAll);

    // Update worker
    router.put("/:id", worker.update);

    //Delete worker
    router.delete("/:id", worker.delete);

    app.use('/api/worker', router);

};