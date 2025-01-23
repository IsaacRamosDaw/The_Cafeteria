const db = require("../models");
const Product = db.product;

exports.findAll = (req, res) => {
	Product.findAll()
		.then(products => {
			if (!products) {
				return res.status(404).json({
					message: `Product did not found.`
				});
			}
			res.send(products);
		})
		.catch(err =>
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving products."
			})
		);

	exports.create = (req, res) => {
		let productData = {
			name: req.body.name,
			price: req.body.price,
			description: req.body.description,
			filename: req.file ? req.file.filename : "",
			CategoryId: req.body.CategoryId,
		};

		Product.create(productData)
			.then(product => res.status(201)
				.json({
					message: "Product created successfully",
					product: product,
				}))
			.catch(err =>
				res.status(500).send({
					message:
						err.message || "Some error while creating the product."
				})
			);
	}
};