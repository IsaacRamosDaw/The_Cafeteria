const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const course = sequelize.define(() => {
    id: {
      type: DataTypes.NUMBER
      primaryKey: true
    } 
    name: {
      type: DataTypes.STRING
    }
  });

  return course;
};
