const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const worker = sequelize.define("Worker", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return worker;
};

