const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
    const orderLine = sequelize.define('OrderLine', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
        }
    });

    return orderLine;
};
