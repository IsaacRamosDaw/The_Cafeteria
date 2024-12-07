'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
        Example: await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "1º Eso",
          filename: "../../frontend/public/images/ImgMenus/bocadillos.jpg",
          CategoryId: "1"
        },
        {
          name: "2º Eso",
          filename: "../../frontend/public/images/ImgMenus/bocadillos.jpg",
          CategoryId: "1"
        },
        {
          name: "3º Eso",
          filename: "../../frontend/public/images/ImgMenus/bocadillos.jpg",
          CategoryId: "1"
        },
        {
          name: "4º Eso",
          filename: "../../frontend/public/images/ImgMenus/bocadillos.jpg",
          CategoryId: "1"
        },
        {
          name: "1º Bachiller",
          filename: "../../frontend/public/images/ImgMenus/bocadillos.jpg",
          CategoryId: "1"
        },
        {
          name: "2º Bachiller",
          filename: "../../frontend/public/images/ImgMenus/bocadillos.jpg",
          CategoryId: "1"
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
