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
};

exports.create = (req, res) => {
  let productData = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    filename: req.file ? req.file.filename : "",
    categoryId: req.body.categoryId,
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


exports.findByCategory = (req, res) => {
  const categoryId = Number(req.params.id);

  Product.findAll({ where: { CategoryId: categoryId } })
    .then((products) => {
      if (!products) {
        return res.status(404).json({
          message: `Product didn't found.`,
        });
      }
      res.send(products);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};

exports.findFirstOfCategory = (req, res) => {
  const categoryId = Number(req.params.id);

  Product.findOne({ where: { CategoryId: categoryId } })
    .then((products) => {
      if (!products) {
        return res.status(404).json({
          message: `Product didn't found.`,
        });
      }
      res.send(products);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};

exports.countByCategory = (req, res) => {
  const value = req.params.id;

  Product.findAndCountAll({ where: { CategoryId: value } })
    .then((count) => {
      delete count.rows;
      res.send(count);
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Some error occurred while counting categories",
      })
    );
};

exports.findOne = (req, res) => {
  const id = Number(req.params.id);

  Product.findByPk(id)
    .then((products) => {
      if (!products) {
        return res.status(404).json({
          message: `Product with id=${id} not found.`,
        });
      }
      res.send(products);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving product with id=${id}.`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body.name) {
    return res.status(400).send({ message: "The name field cannot be empty." });
  }

  const update = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    filename: req.file ? req.file.filename : "",
  };

	Product.update(update, { where: { id: id } })
		.then(([rowsUpdated]) => {
			if (rowsUpdated === 0) {
				return res.status(404).send({
					message: `Cannot update product with id=${id}. Product not found.`
				});
			}
			res.send({ message: "Product was updated successfully." });
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "An error occurred while updating the Product."
			});
		});
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({ where: { id: id } })
    .then((productDeleted) => {
      if (productDeleted) {
        res.json({ message: `Product with id: ${id} deleted successfully.` });
      } else {
        res.status(404).json({ message: "Product not found." });
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: err.message || "Error deleting product.",
      })
    );
};
