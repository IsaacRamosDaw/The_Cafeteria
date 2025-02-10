const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Order = sequelize.define(
    "orderLines",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unitPrice: {
        type: DataTypes.DECIMAL
      }
    },
    {
      timestamps: false,
    }
  );

  return Order;
};
