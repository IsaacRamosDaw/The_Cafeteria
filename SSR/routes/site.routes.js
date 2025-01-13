module.exports = (app) => {
  const auth = require("../controllers/auth.js");
  var router = require("express").Router();

  router.post("/", auth.signin);
  
  app.use("/api/site", router);
}