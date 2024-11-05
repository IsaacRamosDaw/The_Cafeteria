const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const worker = sequelize.define("Worker", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      // allowNull: true,
    },
  });

  return worker;
};

