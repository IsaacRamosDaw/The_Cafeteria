"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "schools",
      [
        {
          name: "IES El rincon",
          filename: "img-test.jpeg",
          address: "c/ peloponeso, 3",
          email: "Elrincon@gmail.com",
          phone: "928443322",
        },
        {
          name: "CP Mesa Y LOPEZ",
          filename: "img-test.jpeg",
          address: "c/ peloponeso, 3",
          email: "mesaylopez@gmail.com",
          phone: "724353263",
        },
        {
          name: "IES Jinamar",
          filename: "img-test.jpeg",
          address: "c/ peloponeso, 3",
          email: "jinamar@gmail.com",
          phone: "23466375",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("schools", null, {});
  },
};

// Create : npx sequelize-cli seed:generate --name demo-user

// Activate: npx sequelize-cli db:seed:all

// Delete : npx sequelize-cli db:seed:undo

// Deelete all : npx sequelize-cli db:seed:undo:all
