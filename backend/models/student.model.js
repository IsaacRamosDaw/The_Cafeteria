const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const student = sequelize.define('Student', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return student;
};

