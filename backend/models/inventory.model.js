const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
    const inventory = sequelize.define('Inventory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
    });

    return inventory;
};
