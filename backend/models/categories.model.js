const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Category = sequelize.define("Category", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: "categories"
  });

  return Category;
};

