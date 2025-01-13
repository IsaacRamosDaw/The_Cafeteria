const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    timestamps: false,
  });

  return Order;
};
