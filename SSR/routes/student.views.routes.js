module.exports = (app) => {
  const student = require("../controllers/student.controller.js");

  var router = require("express").Router();

  // Get all students views
  router.get("/", student.findAll);

  // Create all students view
  router.get("/create", (req, res) => res.render("student.views/create.student.ejs"));

  // Create all students view
  router.get("/edit/:id", student.edit);

	// Create a student  
  router.post("/", student.createStudent);

	// Update a student view
  router.put("/edit/:id", student.updateStudent);

  // Prefijo general para rutas de estudiante
  app.use("/api/view", router);
};
