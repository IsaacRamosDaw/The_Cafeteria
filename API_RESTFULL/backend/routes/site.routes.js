module.exports = (app) => {
  const auth = require("../controllers/auth.js");
  const site = require("../controllers/site.controller.js")
  let authToken = require('../middlewares/auth.js')
  var router = require("express").Router();

  router.post("/", authToken, auth.signin);

  app.use("/api/site", router);
}