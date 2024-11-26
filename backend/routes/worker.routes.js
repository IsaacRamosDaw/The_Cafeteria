module.exports = (app) => {
    const worker = require("../controllers/worker.controller.js");
    const auth = require("../controllers/auth.js");
    var upload = require("../multer/upload")

    var router = require("express").Router();

    router.post('/signin', (req, res) => auth.signin(req, res, 'worker'));

    //Create a worker
    router.post("/", upload.single('file'), worker.create);

    //List all workers
    router.get("/", auth.isAuthenticated, worker.findAll);
    // router.get("/", worker.findAll);

    // Find a worker with his id
    router.get("/:id", auth.isAuthenticated, worker.findOne);

    // Update worker
    router.put("/:id", upload.single('file'), auth.isAuthenticated, worker.update);

    //Delete worker
    router.delete("/:id", auth.isAuthenticated, worker.delete);


    app.use('/api/worker', router);

};