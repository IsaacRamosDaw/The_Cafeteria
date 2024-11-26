const db = require("../models");
const Student = db.student;
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

    let student = {
        username: req.body.username,
        password: req.body.password,
        age: req.body.age,
        phone: req.body.phone,
        role: req.body.role,
        filename: req.file ? req.file.filename : ""
    }

    Student.findOne({ where: { username: student.username } })
        .then(data => {
            if (data) {
                const result = bcrypt.compareSync(req.body.password, data.password);
                if (!result) return res.status(401).send('Password not valid!');
                const token = utils.generateToken(data);
                const studentObj = utils.getCleanUser(data);

                return res.json({ student: studentObj, access_token: token });
            }

            student.password = bcrypt.hashSync(req.body.password);

            Student.create(student)
                .then(data => {
                    const token = utils.generateToken(data);
                    const studentObj = utils.getCleanUser(data);

                    return res.json({ student: studentObj, access_token: token });
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error while creating the Student."
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

exports.findAll = (req, res) => {
    if (!req.user) {
        return res.status(403).json({
            message: "Access denied. Authentication required."
        });
    }

    if (req.user.role == 'admin' || req.user.role == 'worker') {
        Student.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving students."
                });
            });
    } else if (req.user.role == 'student') {
        Student.findByPk(req.user.id)
            .then(data => {
                if (!data) {
                    return res.status(404).json({
                        message: "Student not found"
                    })
                }
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving student."
                });
            });
    } else {
        res.status(403).json({
            message: "Access denied. Invalid role."
        });
    }
};

exports.findOne = (req, res) => {
    const id = Number(req.params.id);

    if (!req.user) {
        return res.status(403).json({
            message: "Access denied. Authentication required."
        });
    }

    if (req.user.role === 'admin' || id === req.user.id) {
        Student.findByPk(id)
            .then(data => {
                if (!data) {
                    return res.status(404).json({
                        message: `Student with id=${id} not found.`
                    });
                }
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || `Error retrieving student with id=${id}.`
                });
            });
    } else {
        res.status(403).json({ message: "Access denied. You can only access your own data." });
    };
};

exports.update = (req, res) => {
    const id = req.params.id;

    if(req.user.role !== 'admin' && Number(id) !== req.user.id){
        return res.status(403).send({
            message: "Access denied. You can only update your own data."
        })

    }

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

    const updateStudent = {
        username: req.body.username,
        age: req.body.age,
        phone: req.body.phone,
        role: req.body.role,
        filename: req.file ? req.file.filename : ""
    };

    if(req.body.password){
        updateStudent.password = bcrypt.hashSync(req.body.password);
    }

    Student.update(updateStudent, { where: { id: id } })
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                // If no rows were updated, the admin was not found
                return res.status(404).send({
                    message: `Cannot update Student with id=${id}. Student not found.`
                });
            }
            res.send({ message: "Student was updated successfully." });
        })
        .catch(err => {
            // Catch any error
            res.status(500).send({
                message: err.message || "An error occurred while updating the Student."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    if(req.user.role !== 'admin' && Number(id) !== req.user.id){
        return res.status(403).send({
            message: "Access denied. You can only delete your own data."
        })

    };

    // Delete a Student by ID
    Student.destroy({ where: { id: id } })
        .then(deleted => {
            if (deleted) {
                console.log("Student with id:", id, "was deleted.");
                res.json({ message: "Student deleted successfully." });
            } else {
                console.log("Student with id:", id, "was not found.");
                res.status(404).json({ message: "Student not found." });
            }
        })
        .catch(err => {
            console.error("Error deleting student:", err);
            res.status(500).json({ message: "Error deleting student." });
        });
};

// Find user by username and password
exports.findUserByUsernameAndPassword = (req, res) => {
    const { username, password } = req.body;

    Student.findOne({ where: { username } })
        .then(student => {
            if (!student) {
                return res.status(404).send({ message: "User not found." });
            }

            if (req.user.role !== 'admin' && req.user.id !== student.id) {
                return res.status(403).send({
                    message: "Access denied. You can only view your own data."
                });
            }

            const isMatch = bcrypt.compareSync(password, student.password);
            if (!isMatch) {
                return res.status(401).send({ message: "Invalid credentials." });
            }

            res.send(student);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the user."
            });
        });
};

