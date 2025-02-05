module.exports = (app) => {
  const categories = require("../controllers/categories.controller.js");
  const auth = require("../controllers/auth.js");
  const multer = require("../middlewares/multer.js");

  const upload = multer({ dest: "../public/images/worker" });
  const authToken = require("../middlewares/auth.js");

  var router = require("express").Router();

  //List all categories
  router.get("/", authToken, auth.isAuthenticated, categories.findAll);

  // Get one category
  router.get("/:id", authToken, auth.isAuthenticated, categories.findOne);

  // Create a category
  router.post("/", upload.single('file'), authToken, categories.create);

  // Update category
  router.put("/:id", upload.single('file'), authToken, auth.isAuthenticated, categories.update);

  // Delete a category with id
  router.delete("/:id", authToken, auth.isAuthenticated, categories.delete);

  app.use("/api/categories", router);
};
