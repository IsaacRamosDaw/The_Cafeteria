'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "wallets",
      [
        {
          StudentId: "1",
          amount: "50",
        },
        {
          StudentId: "2",
          amount: "50",
        },
        {
          StudentId: "3",
          amount: "50",
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("wallets", null, {});

  }
};
