module.exports = (app) => {
	const student = require("../controllers/student.controller.js");
	const authSession = require("../controllers/auth.session.js");
	const multer = require('../multer/upload.js')

    const upload = multer({dest: '../public/images/student'})

	var router = require("express").Router();

	//List all students
	router.get("/", authSession.isAuthenticated, student.findAll);

	// Retrieve one student
	router.get("/:id", authSession.isAuthenticated, student.findOne);

	//Create an student
	router.post("/", authSession.isAuthenticated, upload.single('file'), student.create);

	// Update student
	router.put("/:id", authSession.isAuthenticated, upload.single('file'), student.update);

	//Delete student 
	router.delete("/:id", authSession.isAuthenticated, student.delete);

	app.use('/api/student', router);

};