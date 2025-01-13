const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // filename:{
    //   type: DataTypes.STRING
    // },
    // amount:{
    //   type: DataTypes.INTEGER
    // }
  },
  {
    timestamps: false,
  });

  return Category;
};

