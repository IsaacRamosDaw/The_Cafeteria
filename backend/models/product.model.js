const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const product = sequelize.define(() => {
    id:{
      type: DataTypes.NUMBER;
      primarykey: true;
    }
    name:{
      type: DataTypes.STRING;
    }
  });

  return product;
};

// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   const Product = sequelize.define("product", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     categoryId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "categories",
//         key: "id",
//       },
//     },
//   });

//   Product.associate = (models) => {
//     Product.belongsTo(models.categories, {
//       foreignKey: "categoryId",
//       as: "category",
//     });
// Product.hasMany(models.orderLine, {
//       foreignKey: "orderLineId",
//       as: "orderLines",
//     });
//   };
// Product.hasMany(models.inventories, {
//       foreignKey: "inventoryId",
//       as: "inventories",
//     });
//   };

//   return Product;
// };

