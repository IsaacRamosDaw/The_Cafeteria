const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    filename:{
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  });

  return Product;
};


