const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  return Course;
};
