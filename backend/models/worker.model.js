const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const worker = sequelize.define(() => {
    id: {
      type: DataTypes.INTEGER;
      primaryKey: true;
    }
    name: {
      type: DataTypes.STRING;
    }
    phone:{
      type: DataTypes.STRING;
    }
    password:{
      type: DataTypes.STRING;
    }
  });

  return worker;
};
