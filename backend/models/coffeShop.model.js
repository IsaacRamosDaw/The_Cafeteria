const { DataTypes } = require("sequelize")
const { sequelize } = require(".")

module.exports = (sequelize) => {
  const coffeShop = sequelize.define(() => {
    
  });

  return coffeShop;
}