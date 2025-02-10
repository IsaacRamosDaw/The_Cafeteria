module.exports = (app) => {
    const worker = require("../controllers/worker.controller.js");
    const authSession = require("../controllers/auth.session.js");
  
    var router = require("express").Router();
  
    //* Views
    // Worker home
    router.get("/index", authSession.isAuthenticated, worker.index);
    // List of workers view
    router.get("/list", authSession.isAuthenticated, worker.list);
    // Create workers view
    router.get("/create", authSession.isAuthenticated, worker.generate);
    // Edit workers view
    router.get("/edit/:id", authSession.isAuthenticated, worker.edit);
  
    app.use("/worker", router);
  };
  