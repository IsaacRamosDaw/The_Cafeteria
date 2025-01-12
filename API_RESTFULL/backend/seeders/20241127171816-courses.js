"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
Example: await queryInterface.bulkInsert(
      "courses",
      [
        {
          name: "1º Eso",
        },
        {
          name: "2º Eso",
        },
        {
          name: "3º Eso",
        },
        {
          name: "4º Eso",
        },
        {
          name: "1º Bachiller",
        },
        {
          name: "2º Bachiller",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
