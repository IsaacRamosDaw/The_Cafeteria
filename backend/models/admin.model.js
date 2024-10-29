const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const admin = sequelize.define(() => {});

  return admin;
};
