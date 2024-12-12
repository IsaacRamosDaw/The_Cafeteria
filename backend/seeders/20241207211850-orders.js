'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "orders",
      [
        {
          StudentId: "1",
          ProductId: "3",
          date: "10/12/12",
        },
        {
          StudentId: "2",
          date: "10/12/12",
          ProductId: "4",

        },
        {
          StudentId: "3",
          date: "10/12/12",
          ProductId: "5",
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("orders", null, {});
  }
};
