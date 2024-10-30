const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
    id: {
        type: DataTypes.INTEGER;
        primarykey: true;
    }
    quantity: {
        type: DataTypes.INTEGER;
    }
    return admin;
};