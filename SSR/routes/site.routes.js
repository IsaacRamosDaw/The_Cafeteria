module.exports = (app) => {
  const auth = require("../controllers/auth.js");
  var router = require("express").Router();

  app.use("/api/site", router);

  router.post("/", auth.signin);
}