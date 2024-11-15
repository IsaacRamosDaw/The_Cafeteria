const db = require("../models");
const Worker = db.worker;
const utils = require("../utils");
const bcrypt = require('bcryptjs');


exports.create = (req, res) => {

    // Create a Worker object and save Worker in the database
   
         if (!req.body.password || !req.body.username || !req.body.role) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    let worker = {
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        role: req.body.role,
    }

    Worker.findOne({ where: { username: worker.username } })
        .then(data => {
            if (data) {
                const result = bcrypt.compareSync(req.body.password, data.password);
                if (!result) return res.status(401).send('Password not valid!');
                const token = utils.generateToken(data);
                const workerObj = utils.getCleanUser(data);

                return res.json({ worker: workerObj, access_token: token });
            }

            worker.password = bcrypt.hashSync(req.body.password);

            Worker.create(worker)
                .then(data => {
                    const token = utils.generateToken(data);
                    const workerObj = utils.getCleanUser(data);

                    return res.json({ worker: workerObj, access_token: token });
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error while creating the Worker."
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
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

exports.findOne = (req, res) => {
    const id = req.params.id;

     Worker.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving User with id= " + id
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
        username: req.body.username,
        phone: req.body.phone,
        password: req.body.password,
        role: req.body.role,
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

exports.findUserByUsernameAndPassword = (req, res) => {
    const worker = req.body.username;
    const pwd = req.body.password;

    Worker.findOne({ where: {username: worker, password: pwd}})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
}

