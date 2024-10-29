const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const order = sequelize.define(() => {});

  return order;
};
