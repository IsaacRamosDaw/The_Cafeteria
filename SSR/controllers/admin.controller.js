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
    res.render("listAdmins", { admins });
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

  if (!req.body.username || !req.body.password) {
    return res.render("edit", { error: "Fields cannot be empty." });
  }

  const update = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password),
  };

  Admin.update(update, { where: { id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        return res.render("editAdmin", {
          error: `Cannot update the admin with id=${id}. Admin not found.`,
        });
      }
      res.redirect("/api/admin");
    })
    .catch((err) => {
      res.render("editAdmin", {
        error: "Error updating the admin: " + (err.message || ""),
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

  Admin.destroy({ where: { id } })
    .then((deleted) => {
      if (!deleted) {
        return res.render("listAdmins", { error: "Admin not found." });
      }
      res.redirect("/api/admin");
    })
    .catch((err) => {
      res.render("listAdmins", {
        error: "Error deleting the admin: " + (err.message || ""),
      });
    });
};
