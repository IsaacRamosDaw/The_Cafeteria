const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
    const school = sequelize.define(() => {
        id: {
            type: DataTypes.NUMBER;
            primaryKey: true;
        }
        name: {
            type: DataTypes.STRING;
        }
        address: {
            type: DataTypes.STRING;
        }
        email: {
            type: DataTypes.STRING;
        }
        phone: {
            type: DataTypes.STRING;
        }
    });
    return school;
};

// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   const Schools = sequelize.define("schools", {
// id: {
//     type: DataTypes.NUMBER;
//     primaryKey: true;
// }
// name:{
//     type: DataTypes.STRING;
// }
// address:{
//     type: DataTypes.STRING;
// }
// email:{
//     type: DataTypes.STRING;
// }
// phone:{
//     type: DataTypes.STRING;
// }
//   adminId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "admins",
//         key: "id",
//       },

//   Schools.associate = (models) => {
//     Schools.hasMany(models.course, {
//       foreignKey: "courseId",
//       as: "courses",
//     });
//      Schools.hasMany(models.worker, {
//       foreignKey: "workerId",
//       as: "workers",
//     });
// Product.hasMany(models.inventories, {
//       foreignKey: "inventoryId",
//       as: "inventories",
//     });
    // Schools.belongsTo(models.admins, {
    //       foreignKey: "adminId",
    //       as: "admin",
    //     });
//   };

//   return Schools;
// };
