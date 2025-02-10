module.exports = (app) => {
  const admin = require("../controllers/admin.controller.js");
  const auth = require("../controllers/auth.js");
  const multer = require('../middlewares/multer.js')
  const authToken = require('../middlewares/auth.js')

  const upload = multer({dest: '../public/images/admin'})

  var router = require("express").Router();

  //Create an admin
  router.post("/", authToken, admin.create);


  // router.post(authToken, "/upload/:folderName", upload.single('file'), admin.create);

  // router.put(authToken, "/upload/:id", upload.single('file'), admin.imgUpdate);

  //List all admins
  router.get("/", authToken, auth.isAuthenticated, admin.findAll);

  // Get one admin
  router.get("/:id", authToken, auth.isAuthenticated, admin.findOne);

  // Update admin
  router.put("/:id", authToken, auth.isAuthenticated, admin.update);

  //Delete admin
  router.delete("/:id",authToken, auth.isAuthenticated, admin.delete);

  app.use("/api/admin", router);
}; 
