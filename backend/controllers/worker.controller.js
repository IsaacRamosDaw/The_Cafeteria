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
    if (!req.user) {
        return res.status(403).json({
            message: "Access denied. Authentication required."
        });
    }

    if (req.user.role == 'admin') {
        Worker.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving workers."
                });
            });
    } else if (req.user.role == 'worker') {
        Worker.findByPk(req.user.id)
            .then(data => {
                if (!data) {
                    return res.status(404).json({
                        message: "Worker not found."
                    });
                }
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving worker."
                });
            });
    } else {
        res.status(403).json({
            message: "Access denied. Invalid role."
        });
    }
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    if (!req.user) {
        return res.status(403).json({
            message: "Access denied. Authentication required."
        });
    }

    if (req.user.role === 'admin') {
        Worker.findByPk(id)
            .then(data => {
                if (!data) {
                    return res.status(404).json({
                        message: `Worker with id=${id} not found.`
                    });
                }
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || `Error retrieving worker with id=${id}.`
                });
            });
    } else if (req.user.role === 'worker') {
        if (parseInt(id) !== req.user.id) {
            return res.status(403).json({
                message: "Access denied. Workers can only access their own data."
            });
        }

        Worker.findByPk(req.user.id)
            .then(data => {
                if (!data) {
                    return res.status(404).json({
                        message: "Worker not found."
                    });
                }
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error retrieving worker."
                });
            });
    } else {
        res.status(403).json({
            message: "Access denied. Invalid role."
        });
    }
};


// Update a worker by ID
exports.update = (req, res) => {
    const id = req.params.id;

    if (req.user.role !== 'admin' && parseInt(id) !== req.user.id) {
        return res.status(403).send({
            message: "Access denied. You can only update your own data."
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

    if (req.user.role !== 'admin' && parseInt(id) !== req.user.id) {
        return res.status(403).send({
            message: "Access denied. You can only update your own data."
        });
    }

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
    const { username, password } = req.body;

    Worker.findOne({ where: { username } })
        .then(worker => {
            if (!worker) {
                return res.status(404).send({ message: "User not found." });
            }

            if (req.user.role !== 'admin' && req.user.id !== worker.id) {
                return res.status(403).send({
                    message: "Access denied. You can only view your own data."
                });
            }

            const isMatch = bcrypt.compareSync(password, worker.password);
            if (!isMatch) {
                return res.status(401).send({ message: "Invalid credentials." });
            }

            res.send(worker);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the user."
            });
        });
};

