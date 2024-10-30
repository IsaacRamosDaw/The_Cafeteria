const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
    id: {
      type: DataTypes.NUMBER;
      primaryKey: true;
    }
    name: {
      type: DataTypes.STRING;
    }
    password: {
      type: DataTypes.STRING;
    }

  return admin;
};

// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   const Admins = sequelize.define("admins", {
  // id: {
  //   type: DataTypes.NUMBER;
  //   primaryKey: true;
  // }
  // name: {
  //   type: DataTypes.STRING;
  // }
  // password: {
  //   type: DataTypes.STRING;
  // }

//   Admins.associate = (models) => {
//     Admins.hasMany(models.school, {
//       foreignKey: "adminId",
//       as: "schools",
//     });
//   };

//   return Admins;
// };

