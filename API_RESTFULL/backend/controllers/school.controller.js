const db = require("../models");
const School = db.school;

exports.create = (req, res) => {


  // if (!req.body.name || req.body.name.length < 3) {
  //   return res.status(400).send({
  //     message: "El nombre debe tener al menos 3 caracteres.",
  //   });
  // }

  // if (!req.body.address || req.body.address.length < 5) {
  //   return res.status(400).send({
  //     message: "La dirección debe tener al menos 5 caracteres.",
  //   });
  // }

  // if (!req.body.email || !/\S+@\S+\.\S+/.test(req.body.email)) {
  //   return res.status(400).send({
  //     message: "El email debe ser válido.",
  //   });
  // }

  // if (!req.body.phone || req.body.phone.length < 10) {
  //   return res.status(400).send({
  //     message: "El teléfono debe tener al menos 10 caracteres.",
  //   });
  // }

  const school = {
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    phone: req.body.phone,
    filename: req.file ? req.file.filename : "",
  };

  School.create(school)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the school.",
      });
    });
};

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
};

// Update a school by ID
exports.update = (req, res) => {
  const id = req.params.id;

  if (Number(id) !== req.user.id) {
    return res.status(403).send({
      message: "Access denied. You can only update your own data.",
    });
  }

  // if (!req.body.name || req.body.name.length < 3) {
  //   return res.status(400).send({
  //     message: "El nombre debe tener al menos 3 caracteres.",
  //   });
  // }

  // if (!req.body.address || req.body.address.length < 5) {
  //   return res.status(400).send({
  //     message: "La dirección debe tener al menos 5 caracteres.",
  //   });
  // }

  // if (!req.body.email || !/\S+@\S+\.\S+/.test(req.body.email)) {
  //   return res.status(400).send({
  //     message: "El email debe ser válido.",
  //   });
  // }

  // if (!req.body.phone || req.body.phone.length < 10) {
  //   return res.status(400).send({
  //     message: "El teléfono debe tener al menos 10 caracteres.",
  //   });
  // }

  const updateSchool = {
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    phone: req.body.phone,
    filename: req.file ? req.file.filename : "",
  };

  School.update(updateSchool, { where: { id: id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        return res.status(404).send({
          message: `Cannot update School with id=${id}. School not found.`,
        });
      }
      res.send({ message: "School was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while updating the school.",
      });
    });
};

// Delete a school by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  School.destroy({ where: { id: id } })
    .then((deleted) => {
      if (deleted) {
        console.log("School with id:", id, "was deleted.");
        res.json({ message: "School deleted successfully." });
      } else {
        console.log("School with id:", id, "was not found.");
        res.status(404).json({ message: "School not found." });
      }
    })
    .catch((err) => {
      console.error("Error deleting school:", err);
      res.status(500).json({ message: "Error deleting school." });
    });
};

exports.imgUpdate = (req, res) => {
  const id = req.params.id;

  console.log(req.user);

  if (req.user.role != "admin") {
    return res.status(403).send({
      message: "Access denied",
    });
  }

  const updateSchool = {
    filename: req.file ? req.file.filename : "",
  };

  School.update(updateSchool, { where: { id: id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        // If no rows were updated, the admin was not found
        return res.status(404).send({
          message: `Cannot update school with id=${id}. admin not found.`,
        });
      }
      res.send({ message: "school was updated successfully." });
    })
    .catch((err) => {
      // Catch any error
      res.status(500).send({
        message: err.message || "An error occurred while updating the admin.",
      });
    });
};
