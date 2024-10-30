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


// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   const Categories = sequelize.define("categories", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//     },
//   });

//   Categories.associate = (models) => {
//     Categories.hasMany(models.product, {
//       foreignKey: "categoryId",
//       as: "products",
//     });
//   };

//   return Categories;
// };
