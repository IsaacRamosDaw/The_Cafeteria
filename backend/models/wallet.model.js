const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  id: {
    type: DataTypes.NUMBER;
    primaryKey: true;
  }
  amount: {
    type: DataTypes.INTEGER;
  }
  return admin;
};

// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   const Wallets = sequelize.define("wallets", {
//     id: {
//   type: DataTypes.NUMBER;
//   primaryKey: true;
// }
// amount: {
//   type: DataTypes.INTEGER;
// }
//   });

//   Wallets.associate = (models) => {
//    Wallets.hasMany(models.student, {
//       foreignKey: "walletId",
//       as: "students",
//     });
//   };

//   return Wallets;
// };
