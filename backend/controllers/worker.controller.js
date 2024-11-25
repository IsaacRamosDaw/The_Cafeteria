const db = require("../models");
const Worker = db.worker;
const utils = require("../utils");
const bcrypt = require('bcryptjs');

// Create a new Worker
exports.create = (req, res) => {
    if (!req.body.password || !req.body.username || !req.body.role) {
        return res.status(400).send({ message: "Content cannot be empty!" });
    }

    const worker = {
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        role: req.body.role,
        filename: req.file ? req.file.filename : ""
    };

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
                    res.json({ worker: workerObj, access_token: token });
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Worker."
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving workers."
            });
        });
};

// Retrieve all workers
exports.findAll = (req, res) => {
    if (!req.user) {
        return res.status(403).json({ message: "Access denied. Authentication required." });
    }
        Worker.findAll()
            .then(data => res.send(data))
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving workers."
                });
            });
    if (req.user.role === 'worker') {
        Worker.findByPk(req.user.id)
            .then(data => {
                if (!data) {
                    return res.status(404).json({ message: "Worker not found." });
                }
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving worker."
                });
            });
    } else {
        res.status(403).json({ message: "Access denied. Invalid role." });
    }
};

// Retrieve a single worker by ID
exports.findOne = (req, res) => {
    const id = Number(req.params.id);

    if (!req.user) {
        return res.status(403).json({ message: "Access denied. Authentication required." });
    }

    if (req.user.role === 'admin' || id === req.user.id) {
        Worker.findByPk(id)
            .then(data => {
                if (!data) {
                    return res.status(404).json({ message: `Worker with id=${id} not found.` });
                }
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || `Error retrieving worker with id=${id}.`
                });
            });
    } else {
        res.status(403).json({ message: "Access denied. You can only access your own data." });
    }
};

// Update a worker by ID
exports.update = (req, res) => {
    const id = req.params.id;

    if (req.user.role !== 'admin' && Number(id) !== req.user.id) {
        return res.status(403).send({
            message: "Access denied. You can only update your own data."
        });
    }

    if (!req.body.username){
        return res.status(400).send({
            message: "The name field cannot be empty."
        });
    }
    
    if (!req.body.password){
        return res.status(400).send({
            message: "The password field cannot be empty."
        });
    };
    
    const updateWorker = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password),
        phone: req.body.phone,
        role: req.body.role,
        filename: req.file ? req.file.filename : ""
    };

    Worker.update(updateWorker, { where: { id } })
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                return res.status(404).send({ message: `Cannot update Worker with id=${id}. Worker not found.` });
            }
            res.send({ message: "Worker was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while updating the Worker."
            });
        });
};

// Delete a worker by ID
exports.delete = (req, res) => {
    const id =req.params.id;

    if (req.user.role !== 'admin' && Number(id) !== req.user.id) {
        return res.status(403).send({
            message: "Access denied. You can only delete your own data."
        });
    };

    Worker.destroy({ where: { id } })
        .then(deleted => {
            if (!deleted) {
                return res.status(404).json({ message: "Worker not found." });
            }
            res.json({ message: "Worker deleted successfully." });
        })
        .catch(err => {
            res.status(500).json({ message: "Error deleting worker." });
        });
};

// Find user by username and password
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

// exports.uploadImage = async (req, res) => {
//     const id = req.params.id;

//     if(req.user.role !== 'admin' && req.user.id !== Number(id)){
//         return res.status(403).json({
//             message: "Access denied."
//         });
//     }

//     if(!req.file){
//         return res.status(400).json({
//             message: "Image can not upload"
//         })
//     }

//     Worker.findByPk(worker)
//     .then((worker) => {
//       if (!worker) {
//         return res.status(404).json({ message: "Trabajador no encontrado." });
//       }

//       worker.workerImage = req.file.buffer;

//       return worker.save();
//     })
//     .then(() => {
//         res.json({
//             message: "Picture upload successfully"
//         });
//     })
//     .catch((error) => {
//         console.error(error);
//         res.status(500).json({
//             message: "Error upload the image."
//         });
//     });
// }


