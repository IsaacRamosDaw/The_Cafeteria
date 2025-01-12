const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Student = sequelize.define('Student', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "student"
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    filename:{
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  });

  return Student;
}

