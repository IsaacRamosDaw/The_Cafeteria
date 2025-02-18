const db = require("../models");
const Order = db.order;
const Wallet = db.wallet;

let updateOrder = require("../ws-server");
// let boberia = require('../ws-server')

exports.create = (req, res) => {
  const orderData = {
    date: req.body.date,
    status: "ready",
    studentId: req.body.studentId,
  };

  Order.create(orderData)
    .then((order) => {
      // Decrement wallet
      // return Wallet.decrement('amount', { by: req.body.price, where: { StudentId: req.body.StudentId } });
      res.status(201).send({ message: "Order created!", order });
    })
    // .then((wallet) => {
    //   if (!wallet) {
    //     return res.status(404).json({
    //       message: `Wallet not found`,
    //     });
    //   }
    //   res.status(201).json({
    //     message: "Order created successfully and wallet decreased",
    //   });
    // })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "Some error occurred: " + err.message,
      });
    });
};

exports.findAll = (req, res) => {
  // Order.findAll({ order: ['id', 'DESC'] })
  Order.findAll()
    .then((orders) => {
      if (!orders) {
        return res.status(404).json({
          message: `Could retrieve all orders`,
        });
      }

      orders.forEach((order) => {
        if (order.status == "completed") {
          orders = orders.filter((order) => order.status !== "completed");
        }
      });

      res.send(orders);
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Orders.",
      })
    );
};

exports.findAllByStudent = (req, res) => {
  const id = Number(req.params.id);

  Order.findAll({ where: { StudentId: id } })
    .then((orders) => {
      if (!orders) {
        return res.status(404).json({
          message: `Student with id: ${id} not found`,
        });
      }

      orders.forEach((order) => {
        if (order.status == "completed") {
          orders = orders.filter((order) => order.status !== "completed");
        }
      });

      res.send(orders);
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
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
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Orders.",
      })
    );
};

exports.update = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).send({
        message: `Order with id=${orderId} not found.`,
      });
    }

    const allowedFields = ["studentId", "date", "status"];
    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return res.status(400).send({
        message: "No valid fields provided for update.",
      });
    }

    const rowBeforeUpdated = await Order.findOne({ where: { id: orderId } });

    if (rowBeforeUpdated.status === "completed") {
      res.send({
        message: "Order was already completd",
      });
    } else {
      const [rowsUpdated] = await Order.update(updateData, {
        where: { id: orderId },
      });

      if (rowsUpdated === 0) {
        return res.status(500).send({
          message: `Error updating Order with id=${orderId}.`,
        });
      }

      res.send({
        message: "Order was updated successfully.",
        updatedFields: updateData,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "An error occurred while updating the Order.",
    });
  }
};

exports.finish = async (req, res) => {
  const orderId = Number(req.params.id);

  if (isNaN(orderId)) {
    return res.status(400).json({ message: "Invalid order ID" });
  }

  try {
    const rowsUpdated = await Order.update(
      { status: "completed" },
      {
        where: { id: orderId },
        returning: true,
      }
    );

    if (rowsUpdated === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const rowAfterUpdated = await Order.findOne({ where: { id: orderId } });

    updateOrder.updateOrder(`${orderId}`, rowAfterUpdated.studentId);

    return res.status(200).json({
      message: `Order with id ${orderId} updated`,
      order: rowAfterUpdated,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error while updating order",
      error: error.message,
    });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  Order.destroy({ where: { id: id } })
    .then((rowsDeleted) => {
      if (rowsDeleted === 0) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json({ message: `Order with id: ${id} was deleted.` });
    })
    .catch((err) => {
      console.error("Error deleting order:", err);
      res
        .status(500)
        .json({ message: "Error deleting order", error: err.message });
    });
};
