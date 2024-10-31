const db = require("../models");
const Category = db.categories;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.id) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    // Create a Category object
    const category = {
        name: req.body.name
    };

    // Save Category in the database
    Category.create(category)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the category."
            });
        });
};

// Retrieve all categories from the database
exports.findAll = (req, res) => {
    Category.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving categories."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    // Validate that the "name" field is present
    if (!req.body.name) {
        return res.status(400).send({
            message: "The name field cannot be empty."
        });
    }

    const updateCategory = {
        name: req.body.name
    };

    // Attempt to update the category
    Category.update(updateCategory, { where: { id: id } })
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                // If no rows were updated, the category was not found
                return res.status(404).send({
                    message: `Cannot update Category with id=${id}. Category not found.`
                });
            }
            res.send({ message: "Category was updated successfully." });
        })
        .catch(err => {
            // Catch any error
            res.status(500).send({
                message: err.message || "An error occurred while updating the category."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    // Delete a Category by ID
    Category.destroy({ where: { id: id } })
        .then(deleted => {
            if (deleted) {
                console.log("Category with id:", id, "was deleted.");
                res.json({ message: "Category deleted successfully." });
            } else {
                console.log("Category with id:", id, "was not found.");
                res.status(404).json({ message: "Category not found." });
            }
        })
        .catch(err => {
            console.error("Error deleting category:", err);
            res.status(500).json({ message: "Error deleting category." });
        });
};
