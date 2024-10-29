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
    school: {
      type: DataTypes.INTEGER
      key: 'id'
    }
  });
  return course;
};
