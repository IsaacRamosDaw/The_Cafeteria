const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const School = sequelize.define("School", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // schoolImage:{
      //   type: DataTypes.BLOB('medium')
      // }
    });

    return School;
};
