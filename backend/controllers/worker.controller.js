const db = require("../models");
const Worker = db.worker;
// const utils = require("../utils");
// const bcrypt = require('bcryptjs');
// const userModel = require("../../../Ej/Ionic8NodeAuthBasic/backend/models/user.model");

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

         // if (!req.body.password || !req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // let worker2 = {
    //     name: req.body.name,
    //     password: req.body.password
    // }

    // Worker.findOne({ where: { workername: worker2.workername } })
    //     .then(data => {
    //         if (data) {
    //             const result = bcrypt.hashSync(req.body.password);
    //             if (!result) return res.status(401).send('Password not valid!');
    //             const token = utils.generateToken(data);
    //             const workerObj = utils.getCleanUser(data);

    //             return res.json({ worker2: workerObj, access_token: token });
    //         }

    //         worker2.password = bcrypt.hashSync(req.body.password);

    //         Worker.create(worker2)
    //             .then(data => {
    //                 const token = utils.generateToken(data);
    //                 const workerObj = utils.getCleanUser(data);

    //                 return res.json({ worker2: workerObj, access_token: token });
    //             })
    //             .catch(err => {
    //                 res.status(500).send({
    //                     message:
    //                         err.message || "Some error while creating the Worker."
    //                 });
    //             });
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while retrieving tutorials."
    //         });
    //     });
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
    Worker.findOne({
      where: {
        id: req.params.id,
      },
    }).then((data) => {
      res.send(data);
    });

     // Worker.findByPk(id)
    // .then(data => {
    //     res.send(data);
    // })
    // .catch(err => {
    //     res.status(500).send({
    //         message: "Error retrieving User with id= " + id
    //     });
    // });
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

// exports.findUserByUsernameAndPassword = (req, res) => {
//     const worker2 = req.body.workername;
//     const pwd = req.body.password;

//     Worker.findOne({ where: {workername: worker2, password: pwd}})
//     .then(data => {
//         res.send(data);
//     })
//     .catch(err => {
//         res.status(500).send({
//             message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//     });
// }

