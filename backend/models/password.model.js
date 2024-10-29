const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const password = sequelize.define(() => {});

  return password;
};
