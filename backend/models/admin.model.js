const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
    id: {
      type: DataTypes.NUMBER;
      primaryKey: true;
    }
    name: {
      type: DataTypes.STRING;
    }
    password: {
      type: DataTypes.STRING;
    }

  return admin;
};
