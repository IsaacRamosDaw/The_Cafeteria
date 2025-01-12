"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "admins",
      [
        {
          username: "mansour",
          password: "1234",
          filename: "img-test.jpeg"
        },
        {
          username: "isaac",
          password: "1234",
          filename: "img-test.jpeg"
        },
        {
          username: "cynthia",
          password: "1234",
          filename: "img-test.jpeg"
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("admins", null, {});
  },
};


// npx sequelize-cli seed:generate --name
// npx sequelize-cli db:seed --seed 20241127165345-admin-seeder.js
// npx sequelize-cli db:seed:all 
