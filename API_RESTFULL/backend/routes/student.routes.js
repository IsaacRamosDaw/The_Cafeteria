module.exports = (app) => {
	const student = require("../controllers/student.controller.js");
	const auth = require("../controllers/auth.js");
	const multer = require('../middlewares/multer.js')

	const authToken = require('../middlewares/auth.js')
    const upload = multer({dest: '../public/images'})

	var router = require("express").Router();

	//List all students
	router.get("/", authToken ,auth.isAuthenticated , student.findAll);

	// Retrieve one student
	router.get("/:id", authToken ,auth.isAuthenticated, student.findOne);

	//Create an student
	// router.post("/", upload.single('file'), authToken, student.create);
	// router.post("/", student.create);

	router.post("/", (req, res, next) => {
		console.log("Datos recibidos en el backend:", req.body); 
		next();
	  }, authToken, student.create);

	// Update student
	router.put("/:id", upload.single('file'), authToken, auth.isAuthenticated, student.update);

	//Delete student 
	router.delete("/:id", authToken, auth.isAuthenticated, student.delete);

	app.use('/api/student', router);

};