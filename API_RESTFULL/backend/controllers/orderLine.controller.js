const db = require("../models");
const OrderLine = db.orderLine;

exports.create = (req, res) => {

  const orderLineData = {
    quantity: req.body.quantity,
    unitPrice: req.body.unitPrice,
    orderId: req.body.orderId,
    productId: req.body.productId,
  };

  OrderLine.create(orderLineData)
    .then((orderLine) => {
      res.status(201).send({ message: "Order line line created!", orderLine})
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "Some error occurred: " + err.message,
      });
    });
};

exports.bulkCreate = (req, res) => {

  OrderLine.bulkCreate(req.body)
    .then((resultLines) => {
      res.status(201).send({ message: "Order lines created!", resultLines})
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "Some error occurred: " + err.message + "Request: " + req.body,
      });
    });
};


exports.findAll = (req, res) => {

  OrderLine.findAll()
    .then((orderLines) => {
      if (!orderLines) {
        return res.status(404).json({
          message: `Could retrieve all order lines`
        });
      }
      res.send(orderLines);
    })
    .catch(err =>
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving order lines."
      })
    );
};

exports.findOne = (req, res) => {
  const id = Number(req.params.id);

  OrderLine.findByPk(id)
    .then((orderLine) => {
      if (!orderLine) {
        return res.status(404).json({
          message: `order line with id=${id} not found`,
        });
      }
      res.send(orderLine);
    })
    .catch(err =>
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving order lines."
      })
    );
};

exports.findByOrders = async (req, res) => {
  try {
    
    const orderId = parseInt(req.params.id);

    // Validar que el ID sea un número válido
    if (!orderId || isNaN(orderId)) {
      return res.status(400).json({ message: "El ID de la orden debe ser un número válido." });
    }

    
    const orderLines = await OrderLine.findAll({
      where: {  orderId: orderId }
    });

    
    if (orderLines.length === 0) {
      return res.status(404).json({ message: "No se encontraron líneas de orden para esta ID." });
    }

    
    return res.status(200).json(orderLines);
  } catch (error) {
    
    console.error(error);
    return res.status(500).json({ message: "Error al buscar lineas de pedido por pedidos", error: error.message });
  }
};

exports.update = async (req, res) => {
  const orderLineId = req.params.id;

  try {
    
    const orderLine = await OrderLine.findByPk(orderLineId);
    if (!orderLine) {
      return res.status(404).send({
        message: `orderLine with id=${orderLineId} not found.`,
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

    
    const [rowsUpdated] = await OrderLine.update(updateData, {
      where: { id: id },
    });

    if (rowsUpdated === 0) {
      return res.status(500).send({
        message: `Error updating order lines with id=${id}.`,
      });
    }

    
    res.send({
      message: "Order lines was updated successfully.",
      updatedFields: updateData,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "An error occurred while updating the OrderLine.",
    });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  OrderLine.destroy({ where: { id: id } })
    .then((orderLineDeleted) => {
      if (!orderLineDeleted) {
        return res.status(404).json({
          message: "order line not found"
        });
      }
      res.json({
        message: `Order line with id: ${id} was deleted.`
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: "Error deleting order line: " || err.message
      })
    )
}

exports.deleteByOrder = (req, res) => {
  const id = req.params.id;

  OrderLine.destroy({ where: { orderId: id } })
    .then((orderLineDeleted) => {
      if (!orderLineDeleted) {
        return res.status(404).json({
          message: "order line not found"
        });
      }
      res.json({
        message: `Order line with id: ${id} was deleted.`
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: "Error deleting order line: " || err.message
      })
    )
}