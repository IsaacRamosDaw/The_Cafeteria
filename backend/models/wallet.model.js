const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  id: {
    type: DataTypes.NUMBER;
    primaryKey: true;
  }
  amount: {
    type: DataTypes.INTEGER;
  }
  return admin;
};