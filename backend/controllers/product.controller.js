const db = require("../models");
const Product = db.product;
const Op = db.sequelize.Op;
const utils = require("../utils");

exports.create = (req, res) => {
    let product = {
        name: req.body.name,
        filename: req.file ? req.file.filename : ""
    }

    Product.findOne({ where: { name: product.name } })
        .then(data => {
            if (data) {
                const token = utils.generateToken(data);
                const productObj = utils.getCleanUser(data);

                return res.json({ product: productObj, access_token: token });
            }

            Product.create(product)
                .then(data => {
                    const token = utils.generateToken(data);
                    const productObj = utils.getCleanUser(data);

                    return res.json({ product: productObj, access_token: token });
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error while creating the Student."
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
}

exports.findAll = (req, res) => {
    if (!req.user) {
        return res.status(403).json({
            message: "Access denied. Authentication required."
        });
    }
        Product.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving students."
                });
            });
    
        Product.findByPk(req.product.id)
            .then(data => {
                if (!data) {
                    return res.status(404).json({
                        message: "Student not found"
                    })
                }
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving student."
                });
            });
    
        res.status(403).json({
            message: "Access denied. Invalid role."
        });
};

exports.findOne = (req, res) => {
    const id = Number(req.params.id);

    if (!req.user) {
        return res.status(403).json({
            message: "Access denied. Authentication required."
        });
    }

        Product.findByPk(id)
            .then(data => {
                if (!data) {
                    return res.status(404).json({
                        message: `Product with id=${id} not found.`
                    });
                }
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || `Error retrieving product with id=${id}.`
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
        filename: req.file ? req.file.filename : ""
    };

    Product.update(update, { where: { id: id } })
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                return res.status(404).send({
                    message: `Cannot update Product with id=${id}. Product not found.`
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
        .then(deleted => {
            if (deleted) {
                res.json({ message: "Product deleted successfully." });
            } else {
                res.status(404).json({ message: "Product not found." });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error deleting product." });
        });
};
