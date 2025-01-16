//!TO CHECK
const db = require("../models");
const Product = db.product;

exports.create = (req, res) => {
 res.render("product/create-product");
}

exports.findAll = (req, res) => {
  Product.findAll()
    .then(products => {
      if (!products) {
        return res.status(404).json({
          message: `Products did not found.`
        });
      }
      res.render("product/list-product", {products});
    })
    .catch(err => 
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving products."
      })
    );
};

exports.findOne = (req, res) => {
  const id = Number(req.params.id);

  Product.findByPk(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: `Product with id=${id} not found.`,
        });
      }
      res.render("product/data-product", {product});
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving product with id=${id}.`,
      });
    });
};


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

exports.edit = (req, res) => {
  const id = Number(req.params.id);

  Product.findByPk(id)
    .then((product) => {
      if (!product) {
        res.status(404).render("error", {
          error: "product with id :" + id + " not found",
        });
      }
      res.render("product/update-product", {product});
    }).catch((err) => {
      res.status(500).render("error", {
        error: "error fetching the product: " + (err || "unknown error"),
      });
    });
}
