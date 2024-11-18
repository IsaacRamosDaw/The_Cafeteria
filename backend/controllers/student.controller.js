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

    if (req.user.role == 'admin') {
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

    if(req.user.role === 'admin'){
        Student.findByPk(id)
            .then(data => {
                if(!data){
                    return res.status(404).json({
                        message: `Student with id=${id} not found.`
                    });
                }
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || `Error retrieving worker with id=${id}.`
                });
            });
    } else if (req.user.role === 'student') {
        if (parseInt(id) !== req.user.id) {
            return res.status(403).json({
                message: "Access denied. Students can only access their own data."
            });
        }

        Student.findByPk(req.user.id)
            .then(data => {
                if (!data) {
                    return res.status(404).json({
                        message: "Student not found."
                    });
                }
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error retrieving student."
                });
            });
    } else {
        res.status(403).json({
            message: "Access denied. Invalid role."
        });
    }

}

exports.update = (req, res) => {
    const id = req.params.id;

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
        password: req.body.password,
        age: req.body.age,
        phone: req.body.phone,
        role: req.body.role,
    };

    Student.update(updateStudent, { where: { id: id } })
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                // If no rows were updated, the admin was not found
                return res.status(404).send({
                    message: `Cannot update Admin with id=${id}. Student not found.`
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

exports.findUserByUsernameAndPassword = (req, res) => {
    const student = req.body.username;
    const pwd = req.body.password;

    Admin.findOne({ where: { username: student, password: pwd } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the user."
            });
        }
        )
}
