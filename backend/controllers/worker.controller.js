const db = require("../models");
const Worker = db.worker;

exports.create = (req, res) => {

    // Create a Worker object
    const worker = {
        name: req.body.name,
        phone: req.body.phone,
        password: req.body.password
    };

    // Save Worker in the database
    Worker.create(worker)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the worker."
            });
        });
};

// Retrieve all workers from the database
exports.findAll = (req, res) => {
    Worker.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving workers."
            });
        });
};

// Update a worker by ID
exports.update = (req, res) => {
    const id = req.params.id;

    // Validate that required fields are present
    if (!req.body.name) {
        return res.status(400).send({
            message: "The name field cannot be empty."
        });
    }
    if (!req.body.phone) {
        return res.status(400).send({
            message: "The phone field cannot be empty."
        });
    }
    if (!req.body.password) {
        return res.status(400).send({
            message: "The password field cannot be empty."
        });
    }

    const updateWorker = {
        name: req.body.name,
        phone: req.body.phone,
        password: req.body.password
    };

    // Attempt to update the worker
    Worker.update(updateWorker, { where: { id: id } })
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                // If no rows were updated, the worker was not found
                return res.status(404).send({
                    message: `Cannot update Worker with id=${id}. Worker not found.`
                });
            }
            res.send({ message: "Worker was updated successfully." });
        })
        .catch(err => {
            // Catch any error
            res.status(500).send({
                message: err.message || "An error occurred while updating the worker."
            });
        });
};

// Delete a worker by ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Worker.destroy({ where: { id: id } })
        .then(deleted => {
            if (deleted) {
                console.log("Worker with id:", id, "was deleted.");
                res.json({ message: "Worker deleted successfully." });
            } else {
                console.log("Worker with id:", id, "was not found.");
                res.status(404).json({ message: "Worker not found." });
            }
        })
        .catch(err => {
            console.error("Error deleting worker:", err);
            res.status(500).json({ message: "Error deleting worker." });
        });
};
