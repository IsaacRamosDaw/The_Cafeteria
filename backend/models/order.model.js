const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const order = sequelize.define(() => {
    id:{
      type: DataTypes.INTEGER
      primarykey: true;
    }
    address: {
      type: DataTypes.STRING;
    }
    date:{
      type: DataTypes.DATE;
    }
  });

  return order;
};

// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   const Orders = sequelize.define("orders", {
  // id:{
  //   type: DataTypes.INTEGER
  //   primarykey: true;
  // }
  // address: {
  //   type: DataTypes.STRING;
  // }
  // date:{
  //   type: DataTypes.DATE;
  // }
//     studentId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "students",
//         key: "id",
//       }

// Orders.associate = (models) => {
//     Orders.belongsTo(models.students, {
//               foreignKey: "studentId",
//               as: "student",
//             });
// Orders.hasMany(models.orderLine, {
//       foreignKey: "orderLineId",
//       as: "orderLines",
//     });
// }

// return Orders;
