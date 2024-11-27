"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "schools",
      [
        {
          name: "Ies el rinc",
          filename: "hola",
          address: "c/ peloponeso, 3",
          email: "pepe@pepe.com",
          phone: "928443322",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("schools", null, {});
  },
};

// npx sequelize-cli db:seed:all 
