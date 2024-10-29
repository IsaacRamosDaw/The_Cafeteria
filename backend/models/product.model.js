const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const product = sequelize.define(() => {});

  return product;
};
