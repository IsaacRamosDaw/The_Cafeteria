//!TO CHECK
const db = require("../models");
const Student = db.student;
const Wallet = db.wallet;
const utils = require("../utils");
const bcrypt = require("bcryptjs");


exports.createStudent = async (req, res) => {
  // let studentData = {
  // 	username: req.body.username,
  // 	password: req.body.password,
  // 	age: parseInt(req.body.age),
  // 	phone: req.body.phone,
  // 	CourseId: req.body.CourseId,
  // 	role: "student",
  // 	filename: req.file ? req.file.filename : "",
  // };

  let studentData = {
    username: req.body.username,
    password: req.body.password,
    age: 10,
    phone: ' req.body.phone',
    role: "student",
    filename: "",
  };

  Student.create(studentData)
    .then((student) => {
      console.log('funcionó')
      res.render('welcome')
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error while creating the student: " || err.message,
      })
      res.redirect("error");
    })
}

exports.findAllView = async (req, res) => {
  console.log("aqui empieza...................")
  Student.findAll()
    .then((students) => {
      res.render("student.views/allData.student", {students: students})
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students.",
      });
    });
};

exports.findOneView = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({
        message: `Student with id=${id} not found.`,
      });
    }

    res.render('student.views/data.student', { student: student });
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error retrieving student with id=${id}.`,
    });
  }
};

exports.edit = (req, res) => {
  const id = req.params.id;

  Student.findByPk(id)
    .then((student) => {
      if (!student) {
        res.status(404).render("error", {
          error: "student with id :" + id + " not found",
        });
      }
      res.render("student.views/update.student.ejs", { student });
    }).catch((err) => {
      res.status(500).render("error", {
        error: "error fetching the student: " + (err || "unknown error"),
      });
    });
}

exports.update = (req, res) => {
  const id = req.params.id;

  if (req.user.role !== "admin" && Number(id) !== req.user.id) {
    return res.status(403).send({
      message: "Access denied. You can only update your own data.",
    });
  }

  if (!req.body.username) {
    return res.status(400).send({
      message: "The name field cannot be empty.",
    });
  }
  if (!req.body.password) {
    return res.status(400).send({
      message: "The password field cannot be empty.",
    });
  }

  const updateStudent = {
    username: req.body.username,
    age: req.body.age,
    phone: req.body.phone,
    role: "student",
    CourseId: req.body.CourseId,
    filename: req.file ? req.file.filename : "",
  };

  if (req.body.password) {
    updateStudent.password = bcrypt.hashSync(req.body.password);
  }

  Student.update(updateStudent, { where: { id: id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        // If no rows were updated, the admin was not found
        return res.status(404).send({
          message: `Cannot update Student with id=${id}. Student not found.`,
        });
      }
      res.send({ message: "Student was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while updating the Student.",
      });
    });
};

exports.updateStudent = (req, res) => {
  const id = req.params.id;

  if (!req.body.username) {
    return res.status(400).send({
      message: "The name field cannot be empty.",
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: "The password field cannot be empty.",
    });
  }

  const updateStudentData = {
    username: req.body.username,
    // password: req.body.password,
    // age: req.body.age,
    // phone: req.body.phone,
    // role: "student",
    // filename: "",
  };

  // if (req.body.password) {
  // 	updateStudentData.password = bcrypt.hashSync(req.body.password);
  // }
  console.log("UPDATE.......................................")
  console.log(id)
  Student.update(updateStudentData, { where: { id: id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        return res.status(404).send({
          message: `Cannot update Student with id=${id}. Student not found.`,
        });
      }
      res.render("student.views/allData.student");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while updating the Student.",
      });
    });
};

exports.imgUpdate = (req, res) => {
  const id = req.params.id;

  console.log(req.user);

  if (
    !(
      req.user.role == "admin" ||
      (req.user.role == "student" && Number(id) == req.user.id)
    )
  ) {
    return res.status(403).send({
      message: "Access denied. You can only update your own data.",
    });
  }

  const updateStudent = {
    filename: req.file ? req.file.filename : "",
  };

  Student.update(updateStudent, { where: { id: id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        // If no rows were updated, the student was not found
        return res.status(404).send({
          message: `Cannot update Student with id=${id}. Student not found.`,
        });
      }
      res.send({ message: "Student was updated successfully." });
    })
    .catch((err) => {
      // Catch any error
      res.status(500).send({
        message: err.message || "An error occurred while updating the Student.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  // Delete a Student by ID
  Student.destroy({ where: { id: id } })
    .then((deleted) => {
      if (deleted) {
        console.log("Student with id:", id, "was deleted.");
        res.json({ message: "Student deleted successfully." });
      } else {
        console.log("Student with id:", id, "was not found.");
        res.status(404).json({ message: "Student not found." });
      }
    })
    .catch((err) => {
      console.error("Error deleting student:", err);
      res.status(500).json({ message: "Error deleting student." });
    });
};

// Find user by username and password
exports.findUserByUsernameAndPassword = (req, res) => {
  const { username, password } = req.body;

  Student.findOne({ where: { username } })
    .then((student) => {
      if (!student) {
        return res.status(404).send({ message: "User not found." });
      }

      if (req.user.role !== "admin" && req.user.id !== student.id) {
        return res.status(403).send({
          message: "Access denied. You can only view your own data.",
        });
      }

      const isMatch = bcrypt.compareSync(password, student.password);
      if (!isMatch) {
        return res.status(401).send({ message: "Invalid credentials." });
      }

      res.send(student);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the user.",
      });
    });
};
