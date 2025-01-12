const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const Wallet = sequelize.define(
    "Wallet",
    {
      amount: {
        type: DataTypes.DECIMAL,
      },
    },
    {
      timestamps: false,
    }
  );
  return Wallet;
};
