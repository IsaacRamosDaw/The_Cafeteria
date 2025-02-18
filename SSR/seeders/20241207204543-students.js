'use strict';
const { generateToken } = require("../utils");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("students",
      [
        {
          username: "student1",
          password: "$2a$12$C65edLxRXj5DmjJDYg9qde0kUuim/HWHl1kSC9iORRRhrhv2VwkqC",
          age: "95",
          phone: "902 196 705",
          // CourseId: "1",
          filename: "file.jpg",
        },
        {
          username: "student2",
          password: "$2a$12$C65edLxRXj5DmjJDYg9qde0kUuim/HWHl1kSC9iORRRhrhv2VwkqC",
          age: "95",
          phone: "902 196 705",
          // CourseId: "1",
          filename: "file.jpg",
        },
        {
          username: "student3",
          password: "$2a$12$C65edLxRXj5DmjJDYg9qde0kUuim/HWHl1kSC9iORRRhrhv2VwkqC",
          age: "95",
          phone: "902 196 705",
          // CourseId: "2",
          filename: "file.jpg",
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("students", null, {});
  }
};
