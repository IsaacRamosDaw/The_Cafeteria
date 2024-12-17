module.exports = (app) => {
	const wallet = require("../controllers/wallet.controller.js");
	const auth = require("../controllers/auth.js");

	var router = require("express").Router();

	// Create is in student controller

	// Retrieve wallet from student
	router.get("/:id", auth.isAuthenticated,  wallet.findOne);

	// Increase wallet amount
	router.put("/increase", auth.isAuthenticated, wallet.addCredits);

	// Create is on student controller
	
	// Decremente is on order controller

	app.use('/api/wallet', router);
};