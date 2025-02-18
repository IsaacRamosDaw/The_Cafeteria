const db = require("../models");
const Op = db.sequelize.Op;
const bcrypt = require("bcryptjs");

const Admin = db.admins;
const Student = db.student
const Worker = db.worker

exports.create = (req, res) => {
  if (!req.body.password || !req.body.username) {
    console.log("Crear admin: ", req.body);
    return res.json({ message: "Content cannot be empty! " });
  }

  let admin = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password),
    role: "admin",
    filename: req.file ? req.file.filename : "",
  };

  console.log("Create admin controller: ", admin);

  Admin.findOne({ where: { username: admin.username } })
    .then((data) => {
      if (data) {
        return res.json({ message: "The username already exists!" });
      }

      Admin.create(admin)
        .then(() => {
          res.redirect("/admin");
        })
        .catch((err) => {
          res.json({
            message:
              "Error creating the admin: " + (err.message || "Uknown error"),
          });
        });
    })
    .catch((err) => {
      res.json({
        message: "Error finding the admin: " + (err.message || "Uknown error"),
      });
    });
};


exports.findOne = (req, res) => {
	const id = Number(req.params.id);

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
				message: err.message || `Error retrieving Admin with id=${id}.`,
			});
		});
};

exports.findAll = (req, res) => {
  Admin.findAll()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.error("Error while getting all admins: ", err);
      res.status(500).send({
        message: "Error while retrieving admins.",
      });
    });
};

exports.index = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    const students = await Student.findAll();
    const workers = await Worker.findAll();

    res.render("admins.views/home.admin.ejs", { admins, students, workers }); 
  } catch (err) {
    console.error("Error while rendering admins page: ", err);
    res.status(500).send({
      message: "Error while loading the admins page.",
    });
  }
};

exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body.username) {
    return res.json({ message: "Username is required" });
  }

  let data = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password),
    role: "admin",
    filename: req.file ? req.file.filename : "",
  };

  Admin.update(data, { where: { id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        return res.json({ message: `admin with id=${id} not found.` });
      }
      res.json({ message: "admin updated successfully" });
    })
    .catch((err) => {
      res.json({ message: "Error updating admin", error: err.message });
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

exports.delete = (req, res) => {
  const id = req.params.id;
  console.log("ID recibido para eliminar:", id);

  Admin.destroy({ where: { id: id } })
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).json({ error: "Admin not found." });
      }
      return res
        .status(200)
        .json({ message: "Admin eliminado correctamente." });
    })
    .catch((err) => {
      console.error("Error al eliminar el admin:", err);
      res.status(500).json({
        error: "Error deleting the admin: " + (err.message || "Unknown error"),
      });
    });
};
