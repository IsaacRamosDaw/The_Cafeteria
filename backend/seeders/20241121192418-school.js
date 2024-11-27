"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "schools",
      [
        {
          name: "Ies el rincon",
          filename: "ieselrincon.jpg",
          address: "c/ peloponeso, 3",
          email: "Elrincon@gmail.com",
          phone: "928443322",
        },
        {
          name: "Alonso quesada",
          filename: "ieselrincon.jpg",
          address: "c/ panadero, 17",
          email: "Alonso@gmail.com",
          phone: "607841234",
        },
        {
          name: "Pablo Montesino",
          filename: "ieselrincon.jpg",
          address: "c/ el material, 23",
          email: "Montesco@gmail.com",
          phone: "123789465",
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
