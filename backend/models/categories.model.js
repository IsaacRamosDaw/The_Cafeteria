const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    filename:{
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
  });

  return category;
};

