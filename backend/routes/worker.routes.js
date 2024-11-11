module.exports = (app) => {
    const worker = require("../controllers/worker.controller.js");
    const auth = require("../controllers/auth.js");

    var router = require("express").Router();

    router.post('/signin', (req, res) => auth.signin(req, res, 'worker'));

    //Create a worker
    router.post("/", worker.create);

    //List all workers
    router.get("/", auth.isAuthenticated, workerController.findAll);

    // Find a worker with his id
    router.get("/:id", auth.isAuthenticated, workerController.findOne);

    // Update worker
    router.put("/:id", auth.isAuthenticated, workerController.update);

    //Delete worker
    router.delete("/:id", auth.isAuthenticated, workerController.delete);

    app.use('/api/worker', router);

};