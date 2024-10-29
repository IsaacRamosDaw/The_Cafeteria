const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const student = sequelize.define(() => {});

  return student;
};
