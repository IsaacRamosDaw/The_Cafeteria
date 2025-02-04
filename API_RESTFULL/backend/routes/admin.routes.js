module.exports = (app) => {
  const admin = require("../controllers/admin.controller.js");
  const auth = require("../controllers/auth.js");
  const multer = require('../middlewares/multer.js')

    const upload = multer({dest: '../public/images/admin'})

  var router = require("express").Router();

  //Create an admin
  router.post("/", admin.create);


  router.post("/upload/:folderName", upload.single('file'), admin.create);

  router.put("/upload/:id", upload.single('file'), admin.imgUpdate);

  //List all admins
  router.get("/", admin.findAll);

  // Get one admin
  router.get("/:id", auth.isAuthenticated, admin.findOne);

  // Update admin
  router.put("/:id", auth.isAuthenticated, admin.update);

  //Delete admin
  router.delete("/:id", auth.isAuthenticated, admin.delete);

  app.use("/api/admin", router);
}; 
