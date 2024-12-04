const db = require("../models");
const CoffeShop = db.coffeShop;
const Op = db.sequelize.Op

exports.create = (req, res) => {

        // Create an coffeShop object
        const shop = {
            name: req.body.name,
            filename: req.file ? req.file.filename : "",
        };

        // Save coffeShop in the database
        CoffeShop.create(shop)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the coffeShop."
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
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving coffeShops."
            });
        });
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
                    message: `Cannot update coffeShop with id=${id}. coffeShop not found.`
                });
            }
            res.send({ message: "coffeShop was updated successfully." });
        })
        .catch(err => {
            // Catch any error
            res.status(500).send({
                message: err.message || "An error occurred while updating the coffeShop."
            });
        });
};

exports.imgUpdate = (req, res) => {
    const id = req.params.id;
  
    console.log(req.user);
  
    if (
      !(req.user.role == "admin" || req.user.role == "worker")
    ) {
      return res.status(403).send({
        message: "Access denied to update.",
      });
    }
  
    const updateCoffe = {
      filename: req.file ? req.file.filename : "",
    };
  
    CoffeShop.update(updateCoffe, { where: { id: id } })
      .then(([rowsUpdated]) => {
        if (rowsUpdated === 0) {
          // If no rows were updated, the admin was not found
          return res.status(404).send({
            message: `Cannot update Student with id=${id}. Student not found.`,
          });
        }
        res.send({ message: "CoffeShop was updated successfully." });
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
    if (req.user.role !== "admin" && req.user.role !== "worker") {
        return res.status(403).send({
          message: "Access denied.",
        });
      }

    // Delete an coffeShop by ID
    CoffeShop.destroy({ where: { id: id } })
        .then(deleted => {
            if (deleted) {
                console.log("coffeShop with id:", id, "was deleted.");
                res.json({ message: "coffeShop deleted successfully." });
            } else {
                console.log("coffeShop with id:", id, "was not found.");
                res.status(404).json({ message: "coffeShop not found." });
            }
        })
        .catch(err => {
            console.error("Error deleting coffeShop:", err);
            res.status(500).json({ message: "Error deleting coffeShop." });
        });
};
