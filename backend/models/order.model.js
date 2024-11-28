const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
