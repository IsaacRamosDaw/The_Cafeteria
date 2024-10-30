const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const inventory = sequelize.define(() => {
  id: {
    type: DataTypes.INTEGER;
    primarykey: true;
  }
  name: {
    type: DataTypes.STRING;
  }
  quantity:{
    type: DataTypes.INTEGER;
  }
  return inventory;
})};

// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   const Inventories = sequelize.define("inventories", {
  // id: {
  //   type: DataTypes.INTEGER;
  //   primarykey: true;
  // }
  // name: {
  //   type: DataTypes.STRING;
  // }
  // quantity:{
  //   type: DataTypes.INTEGER;
  // }
//     productId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "product",
//         key: "id",
//       },
//     schoolId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "schools",
//         key: "id",
//       },


// Inventories.associate = (models) => {
// Inventories.belongsTo(models.product, {
  //       foreignKey: "productId",
  //       as: "product",
  //     });
  // Inventories.belongsTo(models.schools, {
  //       foreignKey: "schoolId",
  //       as: "schools",
  //     });
  // };

  // return inventory