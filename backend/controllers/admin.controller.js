const db = require("../models");
const Admin = db.admins;
const Op = db.sequelize.Op;
const utils = require("../utils");
const bcrypt = require("bcryptjs");

exports.create = (req, res) => {
  if (!req.body.password || !req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  let admin = {
    username: req.body.username,
    password: req.body.password,
    role: "admin",
    filename: req.file ? req.file.filename : "",
  };

  console.log(admin);

  admin.password = bcrypt.hashSync(req.body.password);

  Admin.findOne({ where: { username: admin.username } })
    .then((data) => {
      if (data) {
        const result = bcrypt.compareSync(req.body.password, data.password);
        if (!result) return res.status(401).send("Password not valid!");
        const token = utils.generateToken(data);
        const adminObj = utils.getCleanUser(data);

        return res.json({ admin: adminObj, access_token: token });
      }

      Admin.create(admin)
        .then((data) => {
          console.log("After create", data);
          const token = utils.generateToken(data);
          console.log("After create the token", token);
          const adminObj = utils.getCleanUser(data);
          console.log("After clean user", adminObj);

          return res.json({ admin: adminObj, access_token: token });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error while creating the Admin.",
          });
        });
    })

    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
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

  // Validate request

  if (Number(id) !== req.user.id) {
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

  const update = {
    username: req.body.username,
    password: req.body.password,
    role: "admin",
  };

  if (req.body.password) {
    update.password = bcrypt.hashSync(req.body.password);
  }
  // Attempt to update the admin
  Admin.update(update, { where: { id: id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        // If no rows were updated, the admin was not found
        return res.status(404).send({
          message: `Cannot update Admin with id=${id}. Admin not found.`,
        });
      }
      res.send({ message: "Admin was updated successfully." });
    })
    .catch((err) => {
      // Catch any error
      res.status(500).send({
        message: err.message || "An error occurred while updating the Admin.",
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
        res.json({ message: "Admin deleted successfully." });
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
