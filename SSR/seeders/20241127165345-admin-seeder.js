"use strict";

const { generateToken } = require("../utils");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Datos iniciales de los usuarios
    const admins = [
      {
        username: "mansour",
        password: "$2a$12$C65edLxRXj5DmjJDYg9qde0kUuim/HWHl1kSC9iORRRhrhv2VwkqC",
        filename: "img-test.jpeg"
      },
      {
        username: "isaac",
        password: "$2a$12$C65edLxRXj5DmjJDYg9qde0kUuim/HWHl1kSC9iORRRhrhv2VwkqC",
        filename: "img-test.jpeg"
      },
      {
        username: "cynthia",
        password: "$2a$12$C65edLxRXj5DmjJDYg9qde0kUuim/HWHl1kSC9iORRRhrhv2VwkqC",
        filename: "img-test.jpeg"
      }
    ];

    // Insert data
    await queryInterface.bulkInsert("admins", admins, {});
    
    const insertedAdmins = await queryInterface.sequelize.query(
      `SELECT id, username, role FROM admins`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Generate tokens for users
    // insertedAdmins.forEach((admin) => {
    //   const token = generateToken(admin);
    //   console.log(`Token for ${admin.username}: ${token}`);
    // });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("admins", null, {});
  },
};


// npx sequelize-cli seed:generate --name 
// npx sequelize-cli db:seed --seed 20241127165345-admin-seeder.js
// npx sequelize-cli db:seed:all 
