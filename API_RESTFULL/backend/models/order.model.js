const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Order = sequelize.define(
    "Order",
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
    }
  );

  return Order;
};
