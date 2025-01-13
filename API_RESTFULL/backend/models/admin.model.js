const { DataTypes } = require("sequelize");
const {
  defaultValueSchemable,
  toDefaultValue,
} = require("sequelize/lib/utils");

module.exports = (sequelize) => {
  const Admin = sequelize.define(
    "Admin",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "admin",
      },
      filename:{
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false
    }
  );
  return Admin;
};
