"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "admins",
      [
        {
          username: "Mansour",
          password: "1234",
          role: "admin"
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Admin", null, {});
  },
};

// npx sequelize-cli db:seed --seed 20241127165345-admin-seeder.js
// npx sequelize-cli db:seed:all 
