module.exports = (app) => {
	const wallet = require("../controllers/wallet.controller.js");
	const auth = require("../controllers/auth.js");

	var router = require("express").Router();

	// Retrieve wallet from student
	router.get("/wallet/:id", auth.isAuthenticated, wallet.findOne);

	// Increase wallet amount
	router.put("/wallet/increase", auth.isAuthenticated, wallet.addCredits);

	// Increase wallet amount
	router.put("/wallet/decrease", auth.isAuthenticated, wallet.substractCredits);

	app.use('/api/wallet', router);

};