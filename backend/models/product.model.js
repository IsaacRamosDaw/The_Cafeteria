const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const product = sequelize.define(() => {
    id:{
      type: DataTypes.NUMBER;
      primarykey: true;
    }
    name:{
      type: DataTypes.STRING;
    }
  });

  return product;
};

