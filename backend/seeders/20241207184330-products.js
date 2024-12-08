'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "Bocadillaso",
          filename: "../../frontend/public/images/ImgMenus/bocadillos.jpg",
          CategoryId: "1"
        },
        {
          name: "Bocadillaso3",
          filename: "../../frontend/public/images/ImgMenus/bocadillos.jpg",
          CategoryId: "1"
        },
        {
          name: "!Bocadillon't",
          filename: "../../frontend/public/images/ImgMenus/bocadillos.jpg",
          CategoryId: "1"
        },
        {
          name: "!Bocadillon't",
          filename: "../../frontend/public/images/ImgMenus/bocadillos.jpg",
          CategoryId: "1"
        },
        {
          name: "!Bocadill",
          filename: "../../frontend/public/images/ImgMenus/bocadillos.jpg",
          CategoryId: "1"
        },
        {
          name: "!Bocadillon't",
          filename: "../../frontend/public/images/ImgMenus/bocadillos.jpg",
          CategoryId: "1"
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});

  }
};
