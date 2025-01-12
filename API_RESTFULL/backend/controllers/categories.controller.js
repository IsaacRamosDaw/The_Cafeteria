const db = require("../models");
const Category = db.categories;

exports.create = (req, res) => {
  // Create a Category object
  const category = {
    name: req.body.name,
    amount: req.body.amount,
    filename: req.file ? req.file.filename : "",
  };

  // Save Category in the database
  Category.create(category)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category.",
      });
    });
};

// Retrieve all categories
exports.findAll = (req, res) => {
  Category.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories.",
      });
    });
};

// Retrieve one category
exports.findOne = (req, res) => {
  const id = Number(req.params.id);

  Category.findByPk(id)
    .then((category) => res.send(category))
    .catch((err) =>
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories.",
      })
    );
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

  // Attempt to update the Category
  Category.update(update, { where: { id: id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        return res.status(404).send({
          message: `Cannot update Category with id=${id}. Category not found.`,
        });
      }
      res.send({ message: "Category was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while updating the Category.",
      });
    });
};

exports.imgUpdate = (req, res) => {
  const id = req.params.id;

  console.log(req.user);

  if (!(req.user.role == "admin" || req.user.role == "worker")) {
    return res.status(403).send({
      message: "Access denied to update.",
    });
  }

  const updateCoffe = {
    filename: req.file ? req.file.filename : "",
  };

  Category.update(updateCoffe, { where: { id: id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        // If no rows were updated, the admin was not found
        return res.status(404).send({
          message: `Cannot update Student with id=${id}. Student not found.`,
        });
      }
      res.send({ message: "Category was updated successfully." });
    })
    .catch((err) => {
      // Catch any error
      res.status(500).send({
        message: err.message || "An error occurred while updating the Student.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Category.destroy({ where: { id: id } })
    .then((deleted) => {
      if (deleted) {
        console.log("Category with id:", id, "was deleted.");
        res.json({ message: "Category deleted successfully." });
      } else {
        console.log("Category with id:", id, "was not found.");
        res.status(404).json({ message: "Category not found." });
      }
    })
    .catch((err) => {
      console.error("Error deleting Category:", err);
      res.status(500).json({ message: "Error deleting Category." });
    });
};
