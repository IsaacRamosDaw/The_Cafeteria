//!TO CHECK
const db = require("../models");
const Admin = db.admins;
const Op = db.sequelize.Op;
const bcrypt = require("bcryptjs");

exports.create = (req, res) => {
  if (!req.body.password || !req.body.username) {
    return res.render("create", { error: "Content cannot be empty!" });
  }

  let admin = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password),
    role: "admin",
    filename: req.file ? req.file.filename : "",
  };

  Admin.findOne({ where: { username: admin.username } })
    .then((data) => {
      if (data) {
        return res.render("create", { error: "The username already exists!" });
      }

      Admin.create(admin)
        .then(() => {
          res.redirect("/api/admin");
        })
        .catch((err) => {
          res.render("createAdmin", {
            error: "Error creating the admin: " + (err.message || ""),
          });
        });
    })
    .catch((err) => {
      res.render("createAdmin", {
        error: "Error finding the admin: " + (err.message || ""),
      });
    });
};

exports.findAll = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.render("admins.views/crudAdmin/listAdmins", { admins });
  } catch (err) {
    res.render("listAdmins", {
      error: "Error retrieving admins: " + (err.message || ""),
    });
  }
};

// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Admin.findByPk(id)
//     .then((data) => {
//       if (!data) {
//         return res.render("details", { error: `Admin with id=${id} not found.` });
//       }
//       res.render("details", { admin: data });
//     })
//     .catch((err) => {
//       res.render("details", {
//         error: "Error retrieving the admin: " + (err.message || ""),
//       });
//     });
// };

exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body.username) {
      return res.status(400).json({ message: "Username is required" });
  }

  const updateData = {
      username: req.body.username,
  };

  Admin.update(updateData, { where: { id } })
      .then(([rowsUpdated]) => {
          if (rowsUpdated === 0) {
              return res.status(404).json({ message: `Admin with id=${id} not found.` });
          }
          res.json({ message: "Admin updated successfully" });
      })
      .catch((err) => {
          res.status(500).json({ message: "Error updating admin", error: err.message });
      });
};


exports.edit = (req, res) => {
  const id = req.params.id;

  Admin.findByPk(id)
    .then((admin) => {
      if (!admin) {
        return res.status(404).render("error", {
          error: `Admin with ID ${id} not found.`,
        });
      }
      res.render("admins.views/crudAdmin/editAdmin", { admin });
    })
    .catch((err) => {
      res.status(500).render("error", {
        error: "Error fetching the admin: " + (err.message || "Unknown error."),
      });
    });
};

// exports.imgUpdate = (req, res) => {
//   const id = req.params.id;

//   const updateAdmin = {
//     filename: req.file ? req.file.filename : "",
//   };

//   Admin.update(updateAdmin, { where: { id } })
//     .then(([rowsUpdated]) => {
//       if (rowsUpdated === 0) {
//         return res.render("edit", { error: `Admin with id=${id} not found.` });
//       }
//       res.redirect("/admins");
//     })
//     .catch((err) => {
//       res.render("edit", {
//         error: "Error updating the image: " + (err.message || ""),
//       });
//     });
// };

exports.delete = (req, res) => {
  const id = req.params.id;
  console.log("ID recibido para eliminar:", id);

  Admin.destroy({ where: { id: id } })
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).json({ error: "Admin not found." });
      }
      return res.status(200).json({ message: "Admin eliminado correctamente." });
    })
    .catch((err) => {
      console.error("Error al eliminar el admin:", err);
      res.status(500).json({
        error: "Error deleting the admin: " + (err.message || "Unknown error"),
      });
    });
};
