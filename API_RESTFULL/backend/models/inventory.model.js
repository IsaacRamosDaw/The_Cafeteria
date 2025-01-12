const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
    const Inventory = sequelize.define('Inventory', {
        name: {
            type: DataTypes.STRING,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
    },
    {
      timestamps: false,
    });

    return Inventory;
};
