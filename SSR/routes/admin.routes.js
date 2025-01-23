module.exports = (app) => {
  const admin = require("../controllers/admin.controller.js");

  const authSession = require("../controllers/auth.session.js");
  const multer = require("../multer/upload.js");

  const upload = multer({ dest: "../public/images/admin" });

  var router = require("express").Router();

  //List all admins
	router.get("/", authSession.isAuthenticated, admin.findAll);

	// Retrieve one admin
	router.get("/:id", authSession.isAuthenticated, admin.findOne);

	//Create an admin
	router.post("/", authSession.isAuthenticated, upload.single('file'), admin.create);

	// Update admin
	router.put("/:id", authSession.isAuthenticated, upload.single('file'), admin.update);

	//Delete admin 
	router.delete("/:id", authSession.isAuthenticated, admin.delete);


  app.use("/api/admin", router);
};
