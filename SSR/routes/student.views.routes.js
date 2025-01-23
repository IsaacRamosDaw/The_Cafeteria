module.exports = (app) => {
  const student = require("../controllers/studentView.controller.js");
  const authSession = require("../controllers/auth.session.js")
  var router = require("express").Router();

  // Get all students views
  router.get("/", authSession.isAuthenticated, student.findAll);

  // Create a students view
  router.get("/create", authSession.isAuthenticated, student.create);

  // Retrieve one student
  router.get("/find/:id", authSession.isAuthenticated, student.findOne);

  // Edit a students view
  router.get("/edit/:id", authSession.isAuthenticated, student.edit);

  app.use("/student", router);
};
