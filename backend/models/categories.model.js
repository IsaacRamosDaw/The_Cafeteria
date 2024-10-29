const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const categories = sequelize.define(() => {
    id: {
      type: DataTypes.INTEGER;
      primaryKey: true;
    }
    name: {
      type: DataTypes.STRING;
    }
  });

  return categories;
};
