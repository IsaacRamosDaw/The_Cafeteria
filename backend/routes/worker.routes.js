module.exports = (app) => {
    const worker = require("../controllers/worker.controller.js");

    var router = require("express").Router();

    // router.post('/signin', (req, res) => auth.signin(req, res, 'worker'));

    //Create a worker
    router.post("/", worker.create);
     // router.post("/", auth.isAuthenticated, workerController.create);

    //List all workers
    router.get("/", worker.findAll);
     // router.get("/", auth.isAuthenticated, workerController.findAll);

    // Find a worker with his id

    router.get("/:id", worker.findOne);
    // router.get("/:id", auth.isAuthenticated, workerController.findOne);

    // Update worker
    router.put("/:id", worker.update);
    // router.put("/:id", auth.isAuthenticated, workerController.update);

    //Delete worker
    router.delete("/:id", worker.delete);
     // router.delete("/:id", auth.isAuthenticated, workerController.delete);

    app.use('/api/worker', router);

};