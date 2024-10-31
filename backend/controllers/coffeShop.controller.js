const db = require("../models");
const coffeShop = db.coffeShop;
const Op = db.sequelize.Op

exports.create = (req, res) => {

    // Create an coffeShop object
    const shop = {
        name: req.body.name,
        password: req.body.password
    };

    // Save coffeShop in the database
    coffeShop.create(shop)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the coffeShop."
            });
        });
};

// Retrieve all coffeShops
exports.findAll = (req, res) => {
    coffeShop.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving coffeShops."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "The name field cannot be empty."
        });
    }
    if (!req.body.password) {
        return res.status(400).send({
            message: "The password field cannot be empty."
        });
    }

    const update = {
        name: req.body.name,
        password: req.body.password
    };

    // Attempt to update the coffeShop
    coffeShop.update(update, { where: { id: id } })
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                // If no rows were updated, the coffeShop was not found
                return res.status(404).send({
                    message: `Cannot update coffeShop with id=${id}. coffeShop not found.`
                });
            }
            res.send({ message: "coffeShop was updated successfully." });
        })
        .catch(err => {
            // Catch any error
            res.status(500).send({
                message: err.message || "An error occurred while updating the coffeShop."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    // Delete an coffeShop by ID
    coffeShop.destroy({ where: { id: id } })
        .then(deleted => {
            if (deleted) {
                console.log("coffeShop with id:", id, "was deleted.");
                res.json({ message: "coffeShop deleted successfully." });
            } else {
                console.log("coffeShop with id:", id, "was not found.");
                res.status(404).json({ message: "coffeShop not found." });
            }
        })
        .catch(err => {
            console.error("Error deleting coffeShop:", err);
            res.status(500).json({ message: "Error deleting coffeShop." });
        });
};
