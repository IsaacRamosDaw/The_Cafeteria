const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const student = sequelize.define(() => {
    id: {
      type: DataTypes.INTEGER;
      primarykey: true;
    }
    name: {
      type: DataTypes.STRING;
    }
    age: {
      type: DataTypes.INTEGER;
    }
    phone: {
      type: DataTypes.STRING;
    }
    password: {
      type: DataTypes.STRING;
    }
  });

  return student;
};
