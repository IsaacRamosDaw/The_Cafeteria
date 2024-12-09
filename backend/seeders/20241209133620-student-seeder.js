"use strict";

const { generateToken } = require("../utils");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Datos iniciales de los usuarios
    const students = [
      {
        username: "student1",
        password: "$2a$12$C65edLxRXj5DmjJDYg9qde0kUuim/HWHl1kSC9iORRRhrhv2VwkqC",
        role: "student",
        age: 14,
        phone: 1234567890,
        filename: "img-test.jpeg",
        CourseId: 1
      },
      {
        username: "student2",
        password: "$2a$12$C65edLxRXj5DmjJDYg9qde0kUuim/HWHl1kSC9iORRRhrhv2VwkqC",
        role: "student",
        age: 15,
        phone: 43664362334,
        filename: "img-test.jpeg",
        CourseId: 1
      },
      {
        username: "student3",
        password: "$2a$12$C65edLxRXj5DmjJDYg9qde0kUuim/HWHl1kSC9iORRRhrhv2VwkqC",
        role: "student",
        age: 12,
        phone: 3542545562,
        filename: "img-test.jpeg",
        CourseId: 1
      }
    ];

    // Inserta los datos iniciales
    await queryInterface.bulkInsert("students", students, {});

    // Recupera los usuarios insertados para generar los tokens
    const insertedStudents = await queryInterface.sequelize.query(
      `SELECT id, username, role FROM students`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Genera tokens para cada usuario y muestra en consola (o los guardas)
    insertedStudents.forEach((student) => {
      const token = generateToken(student);
      console.log(`Token for ${student.username}: ${token}`);
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("students", null, {});
  },
};

// npx sequelize-cli db:seed --seed 20241209133620-student-seeder.js
// npx sequelize-cli db:seed:all 
