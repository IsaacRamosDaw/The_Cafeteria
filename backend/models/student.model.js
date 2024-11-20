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
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    studentImage:{
      type: DataTypes.BLOB('medium')
    }
  });

  return Student;
}

