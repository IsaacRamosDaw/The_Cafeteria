const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Admin = sequelize.define(
    "Admin",
    {
      id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role:{
        type: DataTypes.STRING,
        allowNull: false,
      }
    }
  );

  return Admin;
};
