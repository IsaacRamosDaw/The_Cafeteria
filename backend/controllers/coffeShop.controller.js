const db = require("../models");
const CoffeShop = db.coffeShop;
const Op = db.sequelize.Op;

exports.create = (req, res) => {
  // Create a CoffeShop object
  const shop = {
    name: req.body.name,
    filename: req.file ? req.file.filename : "",
  };

  // Save CoffeShop in the database
  CoffeShop.create(shop)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the coffeShop.",
      });
    });
};

// Retrieve all coffeShops
exports.findAll = (req, res) => {
  if (!req.user) {
    return res.status(403).json({
      message: "Access denied. Authentication required.",
    });
  }
  CoffeShop.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving coffeShops.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = parseInt(req.params.id);

  if (!req.user) {
    return res.status(403).json({
      message: "Access denied. Authentication required.",
    });
  }

  if (
    req.user.role === "admin" ||
    req.user.role === "worker" ||
    id === req.user.id
  ) {
    CoffeShop.findByPk(id)
      .then((data) => {
        if (!data) {
          return res.status(404).json({
            message: `coffe shop with id=${id} not found.`,
          });
        }
        // Delete the password in the get
        delete data.password;
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `Error retrieving coffe shop with id=${id}.`,
        });
      });
  } else {
    res
      .status(403)
      .json({ message: "Access denied. You can only access your own data." });
  }
};

exports.update = (req, res) => {
  const id = req.params.id;

  // Validate request
  if (req.user.role !== "admin" && req.user.role !== "worker") {
    return res.status(403).send({
      message: "Access denied.",
    });
  }

  const update = {
    name: req.body.name,
    filename: req.file ? req.file.filename : "",
  };

  // Attempt to update the coffeShop
  CoffeShop.update(update, { where: { id: id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        // If no rows were updated, the coffeShop was not found
        return res.status(404).send({
          message: `Cannot update coffeShop with id=${id}. coffeShop not found.`,
        });
      }
      res.send({ message: "coffeShop was updated successfully." });
    })
    .catch((err) => {
      // Catch any error
      res.status(500).send({
        message:
          err.message || "An error occurred while updating the coffeShop.",
      });
    });
};

exports.imgUpdate = (req, res) => {
  const id = req.params.id;

  console.log(req.user);

  const updateWorker = {
    filename: req.file ? req.file.filename : "",
  };

  CoffeShop.update(updateWorker, { where: { id: id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        // If no rows were updated, the worker was not found
        return res.status(404).send({
          message: `Cannot update worker with id=${id}. worker not found.`,
        });
      }
      res.send({ message: "worker was updated successfully." });
    })
    .catch((err) => {
      // Catch any error
      res.status(500).send({
        message: err.message || "An error occurred while updating the worker.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  if (req.user.role !== "admin" && req.user.role !== "worker") {
    return res.status(403).send({
      message: "Access denied.",
    });
  }

  // Delete a CoffeShop by id
  CoffeShop.destroy({ where: { id: id } })
    .then((deleted) => {
      if (deleted) {
        console.log("coffeShop with id:", id, "was deleted.");
        res.json({ message: "coffeShop deleted successfully." });
      } else {
        console.log("coffeShop with id:", id, "was not found.");
        res.status(404).json({ message: "coffeShop not found." });
      }
    })
    .catch((err) => {
      console.error("Error deleting coffeShop:", err);
      res.status(500).json({ message: "Error deleting coffeShop." });
    });
};
