const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const categories = sequelize.define(() => {});

  return categories;
};
