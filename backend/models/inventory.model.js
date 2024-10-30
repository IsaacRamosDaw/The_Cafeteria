const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const inventory = sequelize.define(() => {
  id: {
    type: DataTypes.INTEGER;
    primarykey: true;
  }
  name: {
    type: DataTypes.STRING;
  }
  quantity:{
    type: DataTypes.INTEGER;
  }
  return inventory;
})};