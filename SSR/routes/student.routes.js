module.exports = (app) => {
	const student = require("../controllers/student.controller.js");
	const auth = require("../controllers/auth.js");
	const multer = require('../multer/upload.js')

    const upload = multer({dest: '../public/images/student'})

	var router = require("express").Router();


	//List all students
	router.get("/", student.findAll);

	// Retrieve one student
	router.get("/:id",student.findOne);

	//Create an student
	router.post("/", student.create);

	// Update student
	router.put("/:id", student.update);

	// Update photo
	router.put("/upload/:id", upload.single('file'), student.imgUpdate);

	//Delete student 
	router.delete("/:id", student.delete);

	app.use('/api/student', router);

};