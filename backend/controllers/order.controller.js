const db = require("../models");
const Order = db.order;
const utils = require("../utils");

exports.create = (req, res, product) => {
const date = new Date()

let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()

let fullDate = `${month}-${day}-${year}`

  let order = {
    // studentId: req.body.,
    // schoolId: req.body.,
    date: fullDate,
  };

  Order.create(order).then((data) => {

    console.log("Después de crear", data);
    const token = utils.generateToken(data);
    console.log("Después de crear el token", token);
    const orderObj = utils.getCleanUser(data);
    console.log("Después de limpiar el usuario", orderObj);

  }).catch((err) => {
      res.status(500).send({
        message: "Some error ocurred while retrieving tutorial" || err.message,
      });
    });
  
};

exports.findAll = async (req, res) => {
  try {
    const order = await Order.findAll();

    return res.json(order);
  } catch (err) {
    return res.status(500).json({
      message: "Some error occurred while retrieving data." || err.message,
    });
  };
};

exports.delete = (req, res) => {
  const id = req.params.id;

  if (req.user.role !== "admin") {
    return res.status(403).send({
      message: "Access denied. You can only delete your own data.",
    });
  }

  Order.destroy({ where: { id: id } }).then((deleted) => {
    if (deleted) {
      console.log("Order with id:", id, "was deleted.");
      res.json({ message: "Order not found" });

    } else {
      console.log("Order with id:", id, "was not found");
      res.status(404).json({ message: "order not found" });
    }
    

  }).catch((err) => {
    console.error("Error deleting order:", err);
    res.status(500).json({ message: "Error deleting order." });
  })
}