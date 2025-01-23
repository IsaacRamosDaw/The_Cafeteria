module.exports = (app) => {
  const course = require("../controllers/course.controller.js");
  const auth = require("../controllers/auth.js");

  var router = require("express").Router();

  // Create a course 
  router.post("/", course.create);
  
  // Retrieve all course  
  router.get("/", course.findAll);
  
  // Retrieve one course
  router.get("/:id", auth.isAuthenticated, course.findOne);

  // Edit course
  router.put("/:id", auth.isAuthenticated, course.update);

  // Delete course
  router.delete("/:id", auth.isAuthenticated, course.delete);

  app.use("/api/course", router);
}
