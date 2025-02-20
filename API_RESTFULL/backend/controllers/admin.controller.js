const db = require("../models");
const Admin = db.admins;
const Op = db.sequelize.Op;
const utils = require("../utils");
const bcrypt = require("bcryptjs");

exports.create = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({
      message: "El nombre de usuario y la contraseña son obligatorios.",
    });
  }

  if (req.body.username.length < 5) {
    return res.status(400).send({
      message: "El nombre de usuario debe tener al menos 5 caracteres.",
    });
  }

  if (req.body.password.length < 4) {
    return res.status(400).send({
      message: "La contraseña debe tener al menos 4 caracteres.",
    });
  }

  let admin = {
    username: req.body.username,
    password: req.body.password,
    role: "admin",
    filename: req.file ? req.file.filename || req.file.name : "",
  };

  console.log(admin);

  admin.password = bcrypt.hashSync(req.body.password);

  Admin.findOne({ where: { username: admin.username } })
    .then((data) => {
      if (data) {
        const result = bcrypt.compareSync(req.body.password, data.password);
        if (!result) {
          return res.status(401).send("Password not valid!");
        }
        const token = utils.generateToken(data);
        const adminObj = utils.getCleanUser(data);

        return res.status(200).json({ admin: adminObj, access_token: token });
      }
      Admin.create(admin)
        .then((data) => {
          console.log("After create", data);
          const token = utils.generateToken(data);
          console.log("After create the token", token);
          const adminObj = utils.getCleanUser(data);
          console.log("After clean user", adminObj);

          return res.status(201).json({ message: "Admin created successfully", admin: adminObj, access_token: token });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error while creating the Admin.",
          });
        });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.findAll = async (req, res) => {
  if (!req.user) {
    return res.status(403).json({
      message: "Access denied. Authentication required.",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Invalid role.",
    });
  }

  try {
    const admins = await Admin.findAll();
    return res.json(admins);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Some error occurred while retrieving data.",
    });
  }
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  if (!req.user) {
    return res.status(403).json({
      message: "Access denied. Authentication required.",
    });
  }

  if (req.user.role === "admin") {
    Admin.findByPk(id)
      .then((data) => {
        if (!data) {
          return res.status(404).json({
            message: `Admin with id=${id} not found.`,
          });
        }
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `Error retrieving admin with id=${id}.`,
        });
      });
  } else {
    res.status(403).json({
      message: "Access denied. Invalid role.",
    });
  }
};

exports.update = (req, res) => {
  const id = req.params.id;
  if (Number(id) !== req.user.id) {
    return res.status(403).send({
      message: "Access denied. You can only update your own data.",
    });
  }

  if (!req.body.username) {
    return res.status(400).send({
      message: "El campo nombre de usuario no puede estar vacío.",
    });
  }

  if (req.body.password && req.body.password.length < 4) {
    return res.status(400).send({
      message: "La contraseña debe tener al menos 4 caracteres.",
    });
  }

  if (req.body.username.length < 5) {
    return res.status(400).send({
      message: "El nombre de usuario debe tener al menos 5 caracteres.",
    });
  }

  const update = {
    username: req.body.username,
    password: req.body.password,
    filename: req.file ? req.file.filename || req.file.name : "",
    role: "admin",
  };

  if (req.body.password) {
    update.password = bcrypt.hashSync(req.body.password);
  }

  Admin.update(update, { where: { id: id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        return res.status(404).send({
          message: `No se pudo actualizar el Admin con id=${id}. Admin no encontrado.`,
        });
      }
      res.send({ message: "El Admin fue actualizado exitosamente." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrió un error mientras se actualizaba el Admin.",
      });
    });
};

exports.imgUpdate = (req, res) => {
  const id = req.params.id;

  console.log(req.user);

  const updateAdmin = {
    filename: req.file ? req.file.filename : "",
  };

  Admin.update(updateAdmin, { where: { id: id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        return res.status(404).send({
          message: `Cannot update admin with id=${id}. admin not found.`,
        });
      }
      res.send({ message: "admin was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while updating the admin.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  // Delete an Admin by ID
  Admin.destroy({ where: { id: id } })
    .then((deleted) => {
      if (deleted) {
        console.log("Admin with id:", id, "was deleted.");
        res.json({ message: "Admin was deleted successfully." });
      } else {
        console.log("Admin with id:", id, "was not found.");
        res.status(404).json({ message: "Admin not found." });
      }
    })
    .catch((err) => {
      console.error("Error deleting admin:", err);
      res.status(500).json({ message: "Error deleting admin." });
    });
};

// Find user by username and password
exports.findUserByUsernameAndPassword = (req, res) => {
  const { username, password } = req.body;

  Admin.findOne({ where: { username } })
    .then((admin) => {
      if (!admin) {
        return res.status(404).send({ message: "User not found." });
      }

      if (req.user.role !== "admin" && req.user.id !== admin.id) {
        return res.status(403).send({
          message: "Access denied. You can only view your own data.",
        });
      }

      const isMatch = bcrypt.compareSync(password, admin.password);
      if (!isMatch) {
        return res.status(401).send({ message: "Invalid credentials." });
      }

      res.send(admin);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the user.",
      });
    });
};
