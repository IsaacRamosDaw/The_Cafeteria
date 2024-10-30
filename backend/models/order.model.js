const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const order = sequelize.define(() => {
    id:{
      type: DataTypes.INTEGER
      primarykey: true;
    }
    address: {
      type: DataTypes.STRING;
    }
    date:{
      type: DataTypes.DATE;
    }
  });

  return order;
};