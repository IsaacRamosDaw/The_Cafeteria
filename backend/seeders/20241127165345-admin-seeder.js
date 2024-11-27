"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "admin",
      [
        {
          name: "Juan",
          address: "c/ peloponeso, 3",
          email: "pepe@pepe.com",
          phone: "928443322",
          createdAt: ""
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("schools", null, {});
  },
};
