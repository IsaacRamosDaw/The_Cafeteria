const db = require("../models");
const Admin = db.admins;
const Op = db.sequelize.Op;
const utils = require("../utils");
const bcrypt = require('bcryptjs');


exports.create = (req, res) => {

    if (!req.body.password || !req.body.username || !req.body.role) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    let admin = {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        id: req.body.id,
    }


    Admin.findOne({ where: { username: admin.username } })
        .then(data => {
            if (data) {
                const result = bcrypt.compareSync(req.body.password, data.password);
                if (!result) return res.status(401).send('Password not valid!');
                const token = utils.generateToken(data);
                const adminObj = utils.getCleanUser(data);

                return res.json({ admin: adminObj, access_token: token });
            }

            admin.password = bcrypt.hashSync(req.body.password);

            Admin.create(admin)
                .then(data => {
                    console.log("Después de crear", data);
                    const token = utils.generateToken(data);
                    console.log("Después de crear el token", token);
                    const adminObj = utils.getCleanUser(data);
                    console.log("Después de limpiar el usuario", adminObj);

                    return res.json({ admin: adminObj, access_token: token });
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error while creating the Admin."
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
    const id = req.params.id;

    Admin.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving User with id= " + id
            });
        });
}

exports.update = (req, res) => {
    const id = req.params.id;

    // Validate request
    if (!req.body.username) {
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
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        id: req.body.id,
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

exports.findUserByUsernameAndPassword = (req, res) => {
    const admin = req.body.username;
    const pwd = req.body.password;

    Admin.findOne({ where: { username: admin, password: pwd } })
        .then(data => {
            if (data && bcrypt.compareSync(pwd, data.password)) {
                res.send(data);
            } else {
                res.status(401).send("Username or password is incorrect.");
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the user."
            });
        }
        )
};
