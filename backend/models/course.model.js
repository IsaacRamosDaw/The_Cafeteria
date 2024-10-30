const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const course = sequelize.define(() => {
    id: {
      type: DataTypes.NUMBER
      primaryKey: true
    } 
    name: {
      type: DataTypes.STRING
    }
    school: {
      type: DataTypes.INTEGER
      key: 'id'
    }
  });
  return course;
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
//     school: {
//       type: DataTypes.INTEGER
//       key: 'id'
//     }
//     schoolId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "schools",
//         key: "id",
//       },
//     },
//   });

  // Courses.associate = (models) => {
  //   Courses.hasMany(models.student, {
  //     foreignKey: "courseId",
  //     as: "students",
  //   });
  // Courses.belongsTo(models.schools, {
  //       foreignKey: "schoolId",
  //       as: "school",
  //     });
  // };

//   return Courses;
// };
