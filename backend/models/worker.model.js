const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const owner = sequelize.define(() => {});

  return owner;
};
