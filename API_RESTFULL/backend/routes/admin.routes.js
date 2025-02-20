module.exports = (app) => {
  const admin = require("../controllers/admin.controller.js");
  const auth = require("../controllers/auth.js");
  const multer = require("../middlewares/multer.js");

  const upload = multer({ dest: "../public/images/admin" });
  const authToken = require("../middlewares/auth.js");

  var router = require("express").Router();

  //List all admins
  router.get("/", authToken ,auth.isAuthenticated, admin.findAll);

  // Get one admin
  router.get("/:id", authToken ,auth.isAuthenticated, admin.findOne);

  //Create an admin
  router.post("/", upload.single("file"), authToken, admin.create);

  // Update admin
  router.put("/:id", upload.single('file'), authToken, auth.isAuthenticated, admin.update);

  //Delete admin
  router.delete("/:id", authToken, auth.isAuthenticated, admin.delete);

  app.use("/api/admin", router);
};
