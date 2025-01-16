module.exports = (app) => {
  const student = require("../controllers/studentView.controller.js");

  var router = require("express").Router();

    // Get all students views
    router.get("/", student.findAll);

    // Retrieve one student
    router.get("/:id", student.findOne);

    // Create a students view
    router.get("/create", student.create);

    // Edit a students view
    router.get("/edit/:id", student.edit);

  app.use("/api/student/view", router);
};
