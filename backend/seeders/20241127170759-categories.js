'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Bebidas",
          filename: "../public/images/ImgMenus/bebidas.jpg",
        },
        {
          name: "Refrescos",
          filename: "../public/images/ImgMenus/bebidas.jpg",

        },
        {
          name: "Bocadillos",
          filename: "../public/images/ImgMenus/bebidas.jpg",

        },
        {
          name: "Sandwiches",
          filename: "../public/images/ImgMenus/bebidas.jpg",

        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  }
};
