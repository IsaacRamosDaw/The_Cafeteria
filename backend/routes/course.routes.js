module.exports = (app) => {
  const course = require("../controllers/course.controller.js");
  const auth = require("../controllers/auth.js");

  var router = require("express").Router();

  router.post("/", course.create);

  router.get("/", course.findAll);

  router.get("/:id", auth.isAuthenticated, course.findOne);

  router.put("/:id", auth.isAuthenticated, course.update);

  router.delete("/:id", auth.isAuthenticated, course.delete);

  app.use("/api/course", router);
}