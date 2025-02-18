"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("coffeshops", 
    [
      {
        name: "Rincon's Mug",
        filename: "img-test.jpeg",
        AdminId: 1
      },
      {
        name: "Palermo's coffe",
        filename: "img-test.jpeg",
        AdminId: 2
      },
      {
        name: "Pablito segundito",
        filename: "img-test.jpeg",
        AdminId: 2
      },
    ]
    , {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("coffeshops", null, {});
  },
};
