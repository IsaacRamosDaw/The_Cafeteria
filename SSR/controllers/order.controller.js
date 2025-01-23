//!TO CHECK
const db = require("../models");
const Order = db.order;
const Wallet = db.wallet;

exports.create = (req, res) => {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const fullDate = `${month}-${day}-${year}`

  const orderData = {
    StudentId: req.body.StudentId,
    ProductId: req.body.ProductId,
    date: fullDate,
  };

  Order.create(orderData)
    .then((order) => {
      // Decrement wallet
      return Wallet.decrement('amount', { by: req.body.price, where: { StudentId: req.body.StudentId } });
    })
    .then((wallet) => {
      if (!wallet) {
        return res.status(404).json({
          message: `Wallet not found`,
        });
      }
      res.status(201).json({
        message: "Order created successfully and wallet decreased",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "Some error occurred: " + err.message,
      });
    });
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
  const id = Number(req.params.id);

  Order.findAll({ where: { StudentId: id, } })
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
  const id = req.body.id;

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

// exports.createByUrl = (req, res) => {

//   const date = new Date()

//   let day = date.getDate()
//   let month = date.getMonth() + 1
//   let year = date.getFullYear()

//   let fullDate = `${month}-${day}-${year}`

//   let orderData = {
//     StudentId: req.params.studentId,
//     ProductId: req.params.id,
//     date: fullDate,
//   };


//   Order.create(orderData)
//     .then((order) =>
//       res.status(201).json({
//         message: "Order created succesfully",
//         order: order,
//       })
//     )
//     .catch((err) =>
//       res.status(500).send({
//         message: "Some error ocurred while retrieving tutorial" || err.message,

//       })
//     );
// };