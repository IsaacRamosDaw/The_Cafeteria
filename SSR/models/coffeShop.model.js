const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CoffeShop = sequelize.define('CoffeShop', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename:{
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
  });

  return CoffeShop;
}
