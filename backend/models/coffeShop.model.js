const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CoffeShop = sequelize.define('CoffeShop', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coffeShopImage:{
      type: DataTypes.BLOB('medium')
    },
  });

  return CoffeShop;
}
