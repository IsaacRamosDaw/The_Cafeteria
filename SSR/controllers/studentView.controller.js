//!TO CHECK
const db = require("../models");
const Student = db.student;
const bcrypt = require("bcryptjs");

exports.create = (req, res) => {
  res.render("student/create-student")
}

exports.findAll = (req, res) => {
  Student.findAll()
    .then((students) => {
      console.log("students");
      res.render("student/list-student", { students }); 
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Error retrieving students.",
      });
    });
};


exports.findOne = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({
        message: `Student with id=${id} not found dfsasfsd.`,
      });
    }

    res.render('student/data-student', { student });
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
      res.render("student/update-student.ejs", { student });
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
