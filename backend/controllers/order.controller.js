const db = require("../models");
const Order = db.order;

exports.create = (req, res) => {
  const date = new Date()

  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()

  let fullDate = `${month}-${day}-${year}`

  let orderData = {
    StudentId: req.body.StudentId,
    ProductId: req.body.ProductId,
    date: fullDate,
  };

  Order.create(orderData)
    .then((order) =>
      res.status(201).json({
        message: "Order created succesfully",
        order: order,
      })
    )
    .catch((err) =>
      res.status(500).send({
        message: "Some error ocurred while retrieving tutorial" || err.message,
      })
    );
};

exports.createByUrl = (req, res) => {

  const date = new Date()

  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()

  let fullDate = `${month}-${day}-${year}`

  let orderData = {
    StudentId: req.params.studentId,
    ProductId: req.params.id,
    date: fullDate,
  };


  Order.create(orderData)
    .then((order) =>
      res.status(201).json({
        message: "Order created succesfully",
        order: order,
      })
    )
    .catch((err) =>
      res.status(500).send({
        message: "Some error ocurred while retrieving tutorial" || err.message,

      })
    );
};

exports.findAll = (req, res) => {
  Order.findAll()
    .then((orders) => {
      if (!orders) {
        return res.status(404).json({
          message: `Order with id: ${id} did not found`
        });
      }
      res.send(orders);
    })
    .catch(err =>
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Orders."
      })
    );
};


exports.findAllByStudent = (req, res) => {
  Order.findAll({ where: { StudentId: req.params.id, } })
    .then((orders) => {
      if (!orders) {
        return res.status(404).json({
          message: `Order with id: ${id} did not found`
        });
      }
      res.send(orders);
    })
    .catch(err =>
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders."
      })
    );
};

exports.findOne = (req, res) => {
  const id = Number(req.params.id);

  Order.findByPk(id)
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          message: `Order with id=${id} not found`,
        });
      }
      res.send(order);
    })
    .catch(err =>
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Orders."
      })
    );
};

exports.delete = (req, res) => {
  const id = req.params.id;

  // if (req.user.role !== "student") {
  //   return res.status(403).send({
  //     message: "Access denied. You can only delete your own data.",
  //   });
  // }

  Order.destroy({ where: { id: id } })
    .then((orderDeleted) => {
      if (!orderDeleted) {
        return res.status(404).json({
          message: "order not found"
        });
      }
      res.json({
        message: `Order with id: ${id} was deleted.`
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: "Error deleting order: " || err.message
      })
    )
}