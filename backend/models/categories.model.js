const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoriesImage:{
      type: DataTypes.BLOB('medium')
    }
  });

  return category;
};

