'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Bebidas",
          filename: "ieselerincon.jpg",
        },
        {
          name: "Refrescos",
          filename: "ieselerincon.jpg",
        },
        {
          name: "Bocadillos",
          filename: "ieselerincon.jpg",
        },
        {
          name: "Sandwiches",
          filename: "ieselerincon.jpg",
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  }
};
