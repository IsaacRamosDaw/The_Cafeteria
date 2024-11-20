const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productImage:{
      type: DataTypes.BLOB('medium')
    },
  });

  return Product;
};


