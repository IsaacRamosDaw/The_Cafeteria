module.exports = (app) => {
  const student = require("../controllers/studentView.controller.js");

  var router = require("express").Router();

    // Get all students views
    router.get("/", student.findAll);

    // Create a students view
    router.get("/create", student.create);

    // Retrieve one student
    router.get("/find/:id", student.findOne);

    // Edit a students view
    router.get("/edit/:id", student.edit);

  app.use("/api/view/student", router);
};
