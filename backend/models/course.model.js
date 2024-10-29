const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const course = sequelize.define(() => {});

  return course;
};
