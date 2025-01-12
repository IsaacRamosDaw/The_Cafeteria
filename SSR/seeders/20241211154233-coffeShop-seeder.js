"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("coffeshops", 
    [
      {
        name: "Rincon's Mug",
        filename: "img-test.jpeg"
      },
    ]
    , {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("coffeshops", null, {});
  },
};

// npx sequelize-cli db:seed --seed 20241209133620-coffeShop-seeder.js
// npx sequelize-cli db:seed:all 
