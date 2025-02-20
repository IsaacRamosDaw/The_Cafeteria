module.exports = (app) => {
    const worker = require("../controllers/worker.controller.js");
    const auth = require("../controllers/auth.js");
    const multer = require('../middlewares/multer.js')
    
    const upload = multer({dest: '../public/images'})

	const authToken = require('../middlewares/auth.js')

	var router = require("express").Router();

	//List all workers
	router.get("/", authToken ,auth.isAuthenticated, worker.findAll);

	// Retrieve one worker
	router.get("/:id", authToken ,auth.isAuthenticated, worker.findOne);

	//Create an worker
	router.post("/", upload.single('file'), authToken, worker.create);

	// Update worker
	router.put("/:id", upload.single('file'), authToken, auth.isAuthenticated, worker.update);

	//Delete worker 
	router.delete("/:id", authToken, auth.isAuthenticated, worker.delete);

	app.use('/api/worker', router);
};