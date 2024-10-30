const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const worker = sequelize.define(() => {});

  return worker;
};
