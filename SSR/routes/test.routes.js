module.exports = (app) => {
  var router = require("express").Router();
  const test = require("../controllers/test.controller.js");
  
  app.use("/api/site/test", router);

  router.get("/", test.findAll);

  router.post("/",test.create); 
}