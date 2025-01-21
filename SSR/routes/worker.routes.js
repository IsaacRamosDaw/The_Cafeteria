module.exports = (app) => {
    const worker = require("../controllers/worker.controller.js");
    const authSession = require("../controllers/auth.session");
    const multer = require('../multer/upload.js')

    const upload = multer({dest: '../public/images/worker'})
  
    var router = require("express").Router();

    //* Endpoints
    // Get all worker
    router.get("/", worker.findAll);
    // Get one worker
    router.get("/:id", worker.findOne);
    // Create one worker
    router.post("/", upload.single('file'), worker.create);
    // Edit one worker
    router.put("/:id", upload.single('file'), worker.update);
    // Delete one worker
    router.delete("/:id", worker.delete);
  
    app.use("/api/worker", router);
  };
  