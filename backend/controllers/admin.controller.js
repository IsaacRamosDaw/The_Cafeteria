const { where } = require("sequelize");
const db = require("../models");
const Admin = db.admins;
const Op = db.sequelize.Op;
const utils = require("../utils");
const bcrypt = require('bcryptjs');
const userModel = require("../../../Ej/Ionic8NodeAuthBasic/backend/models/user.model");


exports.create = (req, res) => {
    console.log(req.body)
    // Create an Admin object
    const admin = {
        name: req.body.name,
        password: req.body.password
    };

    // Save Admin in the database
    Admin.create(admin)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the admin."
            });
        });

    // if (!req.body.password || !req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // let admin2 = {
    //     name: req.body.name,
    //     password: req.body.password
    // }

    // Admin.findOne({ where: { adminname: admin2.adminname } })
    //     .then(data => {
    //         if (data) {
    //             const result = bcrypt.hashSync(req.body.password);
    //             if (!result) return res.status(401).send('Password not valid!');
    //             const token = utils.generateToken(data);
    //             const adminObj = utils.getCleanUser(data);

    //             return res.json({ admin2: adminObj, access_token: token });
    //         }

    //         admin.password = bcrypt.hashSync(req.body.password);

    //         Admin.create(admin2)
    //             .then(data => {
    //                 const token = utils.generateToken(data);
    //                 const adminObj = utils.getCleanUser(data);

    //                 return res.json({ admin2: adminObj, access_token: token });
    //             })
    //             .catch(err => {
    //                 res.status(500).send({
    //                     message:
    //                         err.message || "Some error while creating the Admin."
    //                 });
    //             });
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while retrieving tutorials."
    //         });
    //     });
}

// Retrieve all admins
exports.findAll = (req, res) => {
    Admin.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving admins."
            });
        });
};

exports.findOne = (req, res) => {
    Admin.findOne({
        where: {
            id: req.params.id
        }
    }).then((data) => {
        res.send(data)
    })

    // Admin.findByPk(id)
    // .then(data => {
    //     res.send(data);
    // })
    // .catch(err => {
    //     res.status(500).send({
    //         message: "Error retrieving User with id=" + id
    //     });
    // });
}

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

    // Attempt to update the admin
    Admin.update(update, { where: { id: id } })
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                // If no rows were updated, the admin was not found
                return res.status(404).send({
                    message: `Cannot update Admin with id=${id}. Admin not found.`
                });
            }
            res.send({ message: "Admin was updated successfully." });
        })
        .catch(err => {
            // Catch any error
            res.status(500).send({
                message: err.message || "An error occurred while updating the Admin."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    // Delete an Admin by ID
    Admin.destroy({ where: { id: id } })
        .then(deleted => {
            if (deleted) {
                console.log("Admin with id:", id, "was deleted.");
                res.json({ message: "Admin deleted successfully." });
            } else {
                console.log("Admin with id:", id, "was not found.");
                res.status(404).json({ message: "Admin not found." });
            }
        })
        .catch(err => {
            console.error("Error deleting admin:", err);
            res.status(500).json({ message: "Error deleting admin." });
        });
};

// exports.findUserByUsernameAndPassword = (req, res) => {
//     const admin2 = req.body.adminname;
//     const pwd = req.body.password;

//     Admin.findOne({ where: {adminname: admin2, password: pwd}})
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
