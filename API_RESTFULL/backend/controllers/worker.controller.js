const db = require("../models");
const Worker = db.worker;
const utils = require("../utils");
const bcrypt = require("bcryptjs");

// Create a new Worker
exports.create = (req, res) => {
  if (!req.body.password || !req.body.username) {
    return res.status(400).send({ message: "Content cannot be empty!" });
  }

  // if (req.body.username.length < 5) {
  //   return res.status(400).send({
  //     message: "The username must have at least 5 characters.",
  //   });
  // }

  // if (req.body.password.length < 4) {
  //   return res.status(400).send({
  //     message: "The password must have at least 4 characters.",
  //   });
  // }

  // if (req.body.phone && req.body.phone.length < 10) {
  //   return res.status(400).send({
  //     message: "The phone number must have at least 10 characters.",
  //   });
  // }

  const worker = {
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    role: "worker",
    filename: req.file ? req.file.filename : "",
  };

  Worker.findOne({ where: { username: worker.username } })
    .then((data) => {
      if (data) {
        const result = bcrypt.compareSync(req.body.password, data.password);
        if (!result) return res.status(401).send("Password not valid!");
        const token = utils.generateToken(data);
        const workerObj = utils.getCleanUser(data);
        return res.json({ worker: workerObj, access_token: token });
      }

      worker.password = bcrypt.hashSync(req.body.password);

      Worker.create(worker)
        .then((data) => {
          const token = utils.generateToken(data);
          const workerObj = utils.getCleanUser(data);
          res.status(201).json({ worker: workerObj, token: token });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Worker.",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving workers.",
      });
    });
};

exports.findAll = async (req, res) => {
  if (!req.user) {
    return res.status(403).json({
      message: "Access denied. Authentication required.",
    });
  }

  if (req.user.role === "admin" || req.user.role === "worker") {
    try {
      const workers = await Worker.findAll();

      return res.json(workers);
    } catch (err) {
      return res.status(500).json({
        message: err.message || "Some error occurred while retrieving data.",
      });
    }
  }

  return res.status(403).json({
    message: "Access denied. Invalid role.",
  });
};

// Retrieve a single worker by ID
exports.findOne = (req, res) => {
  const id = Number(req.params.id);

  if (!req.user) {
    return res
      .status(403)
      .json({ message: "Access denied. Authentication required." });
  }

  if (req.user.role === "admin" || id === req.user.id) {
    Worker.findByPk(id)
      .then((data) => {
        if (!data) {
          return res
            .status(404)
            .json({ message: `Worker with id=${id} not found.` });
        }
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `Error retrieving worker with id=${id}.`,
        });
      });
  } else {
    res
      .status(403)
      .json({ message: "Access denied. You can only access your own data." });
  }
};

// Update a worker by ID
exports.update = (req, res) => {
  const id = req.params.id;

  if (req.user.role !== "admin" && Number(id) !== req.user.id) {
    return res.status(403).send({
      message: "Access denied. You can only update your own data.",
    });
  }

  // if (!req.body.username || req.body.username.length < 5) {
  //   return res.status(400).send({
  //     message: "The username must have at least 5 characters.",
  //   });
  // }

  // if (!req.body.password || req.body.password.length < 4) {
  //   return res.status(400).send({
  //     message: "The password must have at least 4 characters.",
  //   });
  // }

  // if (req.body.phone && req.body.phone.length < 10) {
  //   return res.status(400).send({
  //     message: "The phone number must have at least 10 characters.",
  //   });
  // }

  const updateWorker = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password),
    phone: req.body.phone,
    role: "worker",
    filename: req.file ? req.file.filename : "",
  };

  if (req.body.password) {
    updateWorker.password = bcrypt.hashSync(req.body.password);
  }

  Worker.update(updateWorker, { where: { id: id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        return res.status(404).send({
          message: `Cannot update Worker with id=${id}. Worker not found.`,
        });
      }
      res.send({ message: "Worker was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while updating the Worker.",
      });
    });
};

exports.imgUpdate = (req, res) => {
  const id = req.params.id;

  console.log(req.user);

  if (
    !(
      req.user.role == "admin" ||
      (req.user.role == "worker" && Number(id) == req.user.id)
    )
  ) {
    return res.status(403).send({
      message: "Access denied. You can only update your own data.",
    });
  }

  const updateWorker = {
    filename: req.file ? req.file.filename : "",
  };

  Worker.update(updateWorker, { where: { id: id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        // If no rows were updated, the worker was not found
        return res.status(404).send({
          message: `Cannot update worker with id=${id}. worker not found.`,
        });
      }
      res.send({ message: "Worker was updated successfully." });
    })
    .catch((err) => {
      // Catch any error
      res.status(500).send({
        message: err.message || "An error occurred while updating the worker.",
      });
    });
};

// Delete a worker by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  if (req.user.role !== "admin" && Number(id) !== req.user.id) {
    return res.status(403).send({
      message: "Access denied. You can only delete your own data.",
    });
  }

  Worker.destroy({ where: { id } })
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).json({ message: "Worker not found." });
      }
      res.json({ message: "Worker deleted successfully." });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error deleting worker." });
    });
};

// Find user by username and password
exports.findUserByUsernameAndPassword = (req, res) => {
  const { username, password } = req.body;

  Worker.findOne({ where: { username } })
    .then((worker) => {
      if (!worker) {
        return res.status(404).send({ message: "User not found." });
      }

      if (req.user.role !== "admin" && req.user.id !== worker.id) {
        return res.status(403).send({
          message: "Access denied. You can only view your own data.",
        });
      }

      const isMatch = bcrypt.compareSync(password, worker.password);
      if (!isMatch) {
        return res.status(401).send({ message: "Invalid credentials." });
      }

      res.send(worker);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the user.",
      });
    });
};
