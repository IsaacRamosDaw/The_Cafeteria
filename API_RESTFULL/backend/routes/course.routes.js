module.exports = (app) => {
  const course = require("../controllers/course.controller.js");
  const auth = require("../controllers/auth.js");
  const multer = require("../middlewares/multer.js");

  const upload = multer({ dest: "../public/images" });
  const authToken = require("../middlewares/auth.js");

  var router = require("express").Router();

  var router = require("express").Router();

  // Retrieve all course
  // router.get("/", authToken, auth.isAuthenticated, course.findAll);
  router.get("/", course.findAll);
  // Retrieve one course
  // router.get("/:id", authToken, auth.isAuthenticated, course.findOne);
  router.get("/:id", course.findOne);

  // Create a course
  router.post("/", upload.single('file'), authToken, auth.isAuthenticated, course.create);

  // Edit course
  router.put("/:id", upload.single('file'), authToken, auth.isAuthenticated, course.update);

  // Delete course
  router.delete("/:id", authToken, auth.isAuthenticated, course.delete);

  app.use("/api/course", router);
};
