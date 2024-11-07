const { where } = require("sequelize");
const db = require("../models");
const School = db.school;
const Op = db.sequelize.Op;
// const utils = require("../utils");
// const bcrypt = require('bcryptjs');
// const userModel = require("../../../Ej/Ionic8NodeAuthBasic/backend/models/user.model");

exports.create = (req, res) => {

    // Create a School object
    const school = {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone
    };

    // Save School in the database
    School.create(school)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the school."
            });
        });

    // if (!req.body.password || !req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // let school2 = {
    //     name: req.body.name,
    //     password: req.body.password
    // }

    // School.findOne({ where: { schoolname: school2.schoolname } })
    //     .then(data => {
    //         if (data) {
    //             const result = bcrypt.hashSync(req.body.password);
    //             if (!result) return res.status(401).send('Password not valid!');
    //             const token = utils.generateToken(data);
    //             const schoolObj = utils.getCleanUser(data);

    //             return res.json({ school2: schoolObj, access_token: token });
    //         }

    //         school2.password = bcrypt.hashSync(req.body.password);

    //         School.create(school2)
    //             .then(data => {
    //                 const token = utils.generateToken(data);
    //                 const schoolObj = utils.getCleanUser(data);

    //                 return res.json({ school2: schoolObj, access_token: token });
    //             })
    //             .catch(err => {
    //                 res.status(500).send({
    //                     message:
    //                         err.message || "Some error while creating the School."
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

// Retrieve all schools from the database
exports.findAll = (req, res) => {
  School.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving schools.",
      });
    });
};

exports.findOne = (req, res) => {
  School.findOne({
    where: {
      id: req.params.id,
    },
  }).then((data) => {
    res.send(data);
  });

    // School.findByPk(id)
    // .then(data => {
    //     res.send(data);
    // })
    // .catch(err => {
    //     res.status(500).send({
    //         message: "Error retrieving User with id= " + id
    //     });
    // });
};

// Update a school by ID
exports.update = (req, res) => {
    const id = req.params.id;

    // Validate that required fields are present
    if (!req.body.name) {
        return res.status(400).send({
            message: "The name field cannot be empty."
        });
    }
    if (!req.body.address) {
        return res.status(400).send({
            message: "The address field cannot be empty."
        });
    }
    if (!req.body.email) {
        return res.status(400).send({
            message: "The email field cannot be empty."
        });
    }
    if (!req.body.phone) {
        return res.status(400).send({
            message: "The phone field cannot be empty."
        });
    }

    const updateSchool = {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone
    };

    // Attempt to update the school
    School.update(updateSchool, { where: { id: id } })
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                // If no rows were updated, the school was not found
                return res.status(404).send({
                    message: `Cannot update School with id=${id}. School not found.`
                });
            }
            res.send({ message: "School was updated successfully." });
        })
        .catch(err => {
            // Catch any error
            res.status(500).send({
                message: err.message || "An error occurred while updating the school."
            });
        });
};

// Delete a school by ID
exports.delete = (req, res) => {
    const id = req.params.id;

    School.destroy({ where: { id: id } })
        .then(deleted => {
            if (deleted) {
                console.log("School with id:", id, "was deleted.");
                res.json({ message: "School deleted successfully." });
            } else {
                console.log("School with id:", id, "was not found.");
                res.status(404).json({ message: "School not found." });
            }
        })
        .catch(err => {
            console.error("Error deleting school:", err);
            res.status(500).json({ message: "Error deleting school." });
        });
};

// exports.findUserByUsernameAndPassword = (req, res) => {
//     const school2 = req.body.schoolname;
//     const pwd = req.body.password;

//     School.findOne({ where: {schoolname: school2, password: pwd}})
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
