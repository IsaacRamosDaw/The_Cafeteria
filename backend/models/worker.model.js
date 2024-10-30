const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const worker = sequelize.define(() => {});

  return worker;
};

// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   const Courses = sequelize.define("courses", {
// id: {
//       type: DataTypes.NUMBER
//       primaryKey: true
//     } 
//     name: {
//       type: DataTypes.STRING
//     }
//     phone: {
//       type: DataTypes.STRING
//     }
//     password:{
          // type: DataTypes.STRING
//     }
//     schoolId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "schools",
//         key: "id",
//       },
//     },
//   });

// Workers.associate = (models) => {
  // Workers.belongsTo(models.schools, {
  //       foreignKey: "schoolId",
  //       as: "school",
  //     });
  // };

  // return Workers;
