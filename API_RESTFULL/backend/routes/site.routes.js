module.exports = (app) => {
  const auth = require("../controllers/auth.js");
  let authToken = require('../middlewares/auth.js')
  
  var router = require("express").Router();

  router.post("/", authToken, auth.signin);

  router.get("ws", authToken, auth.signin);

  app.use("/api/site", router);
}