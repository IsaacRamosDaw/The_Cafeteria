const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const student = sequelize.define(() => {
    id: {
      type: DataTypes.INTEGER;
      primarykey: true;
    }
    name: {
      type: DataTypes.STRING;
    }
    age: {
      type: DataTypes.INTEGER;
    }
    phone: {
      type: DataTypes.STRING;
    }
    password: {
      type: DataTypes.STRING;
    }
  });

  return student;
};

// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   const Student = sequelize.define("student", {
//     id:{
// type: DataTypes.INTEGER;
// primarykey: true;
//     }
// name: {
//   type: DataTypes.STRING;
// }
// age: {
//   type: DataTypes.INTEGER;
// }
// phone: {
//   type: DataTypes.STRING;
// }
// password: {
//   type: DataTypes.STRING;
// }
//     walletId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "wallet",
//         key: "id",
//       },
// courseId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "course",
//         key: "id",
//       },
//     },
//   });

//   Student.associate = (models) => {
//     Student.belongsTo(models.wallets, {
//       foreignKey: "walletId",
//       as: "wallet",
//     });
// Student.belongsTo(models.courses, {
//       foreignKey: "courseId",
//       as: "course",
//     });
// Orders.hasMany(models.order, {
//       foreignKey: "order",
//       as: "orders",
//     });
//   };

//   return Student;
// };
