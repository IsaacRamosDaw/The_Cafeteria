module.exports = (app) => {
  const school = require("../controllers/school.controller.js");
  const auth = require("../controllers/auth.js");
  const multer = require("../middlewares/multer.js");

  const upload = multer({ dest: "../public/imagesr" });
  const authToken = require("../middlewares/auth.js");

  var router = require("express").Router();

  //List all schools
  router.get("/", authToken, auth.isAuthenticated, school.findAll);

  // Retrieve one school
  router.get("/:id", authToken, auth.isAuthenticated, school.findOne);

  //Create a school
  router.post("/", upload.single('file'), authToken, school.create);

  // Update school
  router.put("/:id", upload.single('file'), authToken, auth.isAuthenticated, school.update);

  //Delete school
  router.delete("/:id", authToken, auth.isAuthenticated, school.delete);

  app.use("/api/schools", router);
};
