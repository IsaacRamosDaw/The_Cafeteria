module.exports = (app) => {
  const admin = require("../controllers/admin.controller.js");
  const authSession = require("../controllers/auth.session.js");
  var upload = require("../multer/upload.js");

  var router = require("express").Router();

  //Create an admin
  router.post("/", admin.create);

  router.post("/upload/:folderName", upload.single('file'), admin.create);

  router.put("/upload/:id", upload.single('file'), admin.imgUpdate);

  //List all admins
  router.get("/", authSession.isAuthenticated, admin.index);

  // Get one admin
  router.get("/:id", authSession.isAuthenticated, admin.findOne);

  // Update admin
  router.put("/:id", authSession.isAuthenticated, admin.update);

  //Delete admin
  router.delete("/:id", authSession.isAuthenticated, admin.delete);

  app.use("/api/admin", router);
}; 
