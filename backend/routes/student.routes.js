module.exports = (app) => {
	const student = require("../controllers/student.controller.js");
	const auth = require("../controllers/auth.js");
	var upload = require("../multer/upload.js")

	var router = require("express").Router();

	// router.post('/signin', (req, res) => auth.signin(req, res, 'student'));

	//Create an student
	router.post("/", student.create);

	//List all students
	router.get("/", auth.isAuthenticated, student.findAll);

	// Retrieve one student
	router.get("/:id", auth.isAuthenticated, student.findOne);

	// Update student
	router.put("/:id", auth.isAuthenticated, student.update);

	// Update photo
	router.put("/upload/:id", upload.single('file'), student.imgUpdate);

	//Delete student 
	router.delete("/:id", auth.isAuthenticated, student.delete);

	app.use('/api/student', router);

};