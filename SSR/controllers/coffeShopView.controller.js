//!TO CHECK
const db = require("../models");
const CoffeShop = db.coffeShop;

exports.create = (req, res) => {
  res.render("coffeShop/create-coffeShop")
};

// Retrieve all coffeShops
exports.findAll = (req, res) => {
  CoffeShop.findAll()
    .then((coffeShops) => {
      if (!coffeShops) {
        return res.status(404).json({
          message: `CoffeShops did not found.`
        });
      }
      res.render("coffeShop/list-coffeShop", { coffeShops });
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

  CoffeShop.findByPk(id)
    .then((coffeShop) => {
      if (!coffeShop) {
        return res.status(404).json({
          message: `coffeShop with id=${id} not found.`,
        });
      }
      res.render("coffeShop/data-coffeShop", {coffeShop});
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving coffe shop with id=${id}.`,
      });
    });
};

exports.edit = (req, res) => {
  const id = Number(req.params.id);
  CoffeShop.findByPk(id)
    .then((coffeShop) => {
      if (!coffeShop) {
        return res.status(404).json({
          message: `coffeShop with id=${id} not found.`,
        });
      }
      res.render("coffeShop/update-coffeShop", {coffeShop});
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving coffe shop with id=${id}.`,
      });
    });
};