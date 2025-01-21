module.exports = (app) => {
    const worker = require("../controllers/worker.controller.js");
    const authSession = require("../controllers/auth.session");
    const multer = require('../multer/upload.js')

    const upload = multer({dest: '../public/images/worker'})
  
    var router = require("express").Router();

    //* Endpoints
    // Get all worker
    router.get("/", authSession.isAuthenticated, worker.findAll);
    // Get one worker
    router.get("/:id",authSession.isAuthenticated, worker.findOne);
    // Create one worker
    router.post("/",authSession.isAuthenticated, upload.single('file'), worker.create);
    // Edit one worker
    router.put("/:id",authSession.isAuthenticated, upload.single('file'), worker.update);
    // Delete one worker
    router.delete("/:id",authSession.isAuthenticated, worker.delete);
  
    app.use("/api/worker", router);
  };
  