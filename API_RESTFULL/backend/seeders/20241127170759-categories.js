'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Bebidas",
          // filename: "../public/images/ImgMenus/bebidas.jpg",
          // amount: 13
        },
        {
          name: "Refrescos",
          // filename: "../public/images/ImgMenus/bebidas.jpg",
          // amount: 7
        },
        {
          name: "Bocadillos",
          // filename: "../public/images/ImgMenus/bebidas.jpg",
          // amount: 3
        },
        {
          name: "Sandwiches",
          // filename: "../public/images/ImgMenus/bebidas.jpg",
          // amount: 19
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  }
};
