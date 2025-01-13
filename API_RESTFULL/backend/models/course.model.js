const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Course = sequelize.define('Course', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    timestamps: false,
  });

  return Course;
};
