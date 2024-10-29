const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const menu = sequelize.define(() => {});

  return menu;
};
