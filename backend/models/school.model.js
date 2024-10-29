const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
    const school = sequelize.define(() => {
        id: {
            type: DataTypes.NUMBER;
            primaryKey: true;
        }
        name:{
            type: DataTypes.STRING;
        }
        address:{
            type: DataTypes.STRING;
        }
        email:{
            type: DataTypes.STRING;
        }
        phone:{
            type: DataTypes.STRING;
        }
    });
    return school;
};
