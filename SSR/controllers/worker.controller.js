const db = require("../models");
const Worker = db.worker;
const Op = db.sequelize.Op;
const bcrypt = require("bcryptjs");

exports.findAll = (req, res) => {
  Worker.findAll()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.error("Error while getting all Workers: ", err);
      res.status(500).send({
        message: "Error while retrieving Workers.",
      });
    });
};

exports.findOne = (req, res) => {
  let id = req.params.id;

  Worker.findOne({ where: { id: id } })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.error("Error while getting worker with id: " + id, err);
      res.status(500).send({
        message: "Error while getting worker with id: " + id,
        err,
      });
    });
};

exports.create = (req, res) => {
  if (!req.body.password || !req.body.username) {
    console.log("Crear worker: ", req.body);
    return res.json({ message: "Content cannot be empty! " });
  }

  let worker = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password),
    phone: req.body.phone.trim(),
    role: "worker",
    filename: req.file ? req.file.filename : "",
  };

  console.log("Create worker controller: ", worker);

  Worker.findOne({ where: { username: worker.username } })
    .then((data) => {
      if (data) {
        return res.json({ message: "The username already exists!" });
      }

      Worker.create(worker)
        .then(() => {
          res.redirect("/admin");
        })
        .catch((err) => {
          res.json({
            message:
              "Error creating the worker: " + (err.message || "Uknown error"),
          });
        });
    })
    .catch((err) => {
      res.json({
        message: "Error finding the worker: " + (err.message || "Uknown error"),
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body.username) {
    return res.json({ message: "Username is required" });
  }

  let data = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password),
    phone: req.body.phone,
    role: "worker",
    filename: req.file ? req.file.filename : "",
  };

  Worker.update(data, { where: { id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        return res.json({ message: `worker with id=${id} not found.` });
      }
      res.json({ message: "worker updated successfully" });
    })
    .catch((err) => {
      res.json({ message: "Error updating Worker", error: err.message });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  console.log("ID recibido para eliminar:", id);

  Worker.destroy({ where: { id: id } })
    .then((deleted) => {
      if (!deleted) {
        return res.json({ error: "worker not found." });
      }
      return res.json({ message: "worker eliminado correctamente." });
    })
    .catch((err) => {
      console.error("Error al eliminar el Worker:", err);
      res.json({
        message:
          "Error deleting the Worker: " + (err.message || "Unknown error"),
      });
    });
};

exports.index = async (req, res) => {
  return res.render("worker.views/homeWorker");
};

exports.list = async (req, res) => {
  try {
    const workers = await Worker.findAll();

    return res.render("worker.views/crudWorker/listWorker", { workers });
  } catch (err) {
    res.render("error", {
      message: "Error while rendering Workers page: , err",
    });
  }
};

exports.generate = async (req, res) => {
  return res.render("worker.views/crudWorker/createWorker");
};

exports.edit = (req, res) => {
  const id = req.params.id;

  Worker.findByPk(id)
    .then((data) => {
      if (!data) {
        return res.status(404).render("error", {
          error: `worker with ID ${id} not found.`,
        });
      }
      res.render("worker.views/crudWorker/editWorker", { worker: data });
    })
    .catch((err) => {
      res.status(500).render("error", {
        error:
          "Error fetching the worker: " + (err.message || "Unknown error."),
      });
    });
};
