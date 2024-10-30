const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
    id: {
        type: DataTypes.INTEGER;
        primarykey: true;
    }
    quantity: {
        type: DataTypes.INTEGER;
    }
    return admin;
};

// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   const OrderLines = sequelize.define("orderLines", {
// id: {
//     type: DataTypes.INTEGER;
//     primarykey: true;
// }
// quantity: {
//     type: DataTypes.INTEGER;
// }
//     orderId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "orders",
//         key: "id",
//       }
//     productId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "product",
//         key: "id",
//       }

// OrderLines.associate = (models) => {
//     OrderLines.belongsTo(models.orders, {
//         //       foreignKey: "orderId",
//         //       as: "orders",
//         //     });
// OrderLines.belongsTo(models.product, {
//     foreignKey: "productId",
//     as: "product",
//  });
// }

// return OrderLines;