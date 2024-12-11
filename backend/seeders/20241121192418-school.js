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

// Crear : npx sequelize-cli seed:generate --name demo-user

// Activar : npx sequelize-cli db:seed:all

// deshacer : npx sequelize-cli db:seed:undo

// deshacer todos : npx sequelize-cli db:seed:undo:all
