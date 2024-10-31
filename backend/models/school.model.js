const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const School = sequelize.define('School', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return School;
};
