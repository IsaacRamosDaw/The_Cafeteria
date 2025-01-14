module.exports = (app) => {
	const student = require("../controllers/student.controller.js");
	const auth = require("../controllers/auth.js");
	var upload = require("../multer/upload.js")

	var router = require("express").Router();

	//Create an student
	router.post("/", student.create);

	//List all students
	router.get("/", student.findAll);

	// Retrieve one student
	router.get("/:id",student.findOne);

	// Update student
	router.put("/:id", student.update);

	// Update photo
	router.put("/upload/:id", upload.single('file'), student.imgUpdate);

	//Delete student 
	router.delete("/:id", student.delete);

	app.use('/api/student', router);

};