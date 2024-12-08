"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
          name: "Café Espresso",
          description: "Un café espresso fuerte y aromático, ideal para empezar el día.",
          filename: "/images/ImgMenus/sandwiches.jpg",
          CategoryId: "1", // Bebidas
          price: 2.50,
        },
        {
          name: "Té Verde",
          description: "Delicado té verde con antioxidantes, perfecto para relajarse.",
          filename: "/images/ImgMenus/sandwiches.jpg",
          CategoryId: "1",
          price: 2.25,
        },
        {
          name: "Refresco de Cola",
          description: "Refrescante bebida gaseosa con sabor a cola.",
          filename: "/images/ImgMenus/sandwiches.jpg",
          CategoryId: "2", // Refrescos
          price: 1.95,
        },
        {
          name: "Limonada Natural",
          description: "Refrescante limonada hecha con limones frescos y un toque de menta.",
          filename: "/images/ImgMenus/sandwiches.jpg",
          CategoryId: "2",
          price: 2.50,
        },
        {
          name: "Bocadillo de Jamón y Queso",
          description: "Clásico bocadillo con jamón serrano y queso manchego.",
          filename: "/images/ImgMenus/sandwiches.jpg",
          CategoryId: "3", // Bocadillos
          price: 5.95,
        },
        {
          name: "Bocadillo de Tortilla de Patatas",
          description: "Bocadillo tradicional con tortilla española, perfecto para cualquier momento del día.",
          filename: "/images/ImgMenus/sandwiches.jpg",
          CategoryId: "3",
          price: 4.95,
        },
        {
          name: "Sándwich Club",
          description: "Sándwich de tres pisos con pollo, bacon, lechuga y tomate.",
          filename: "/images/ImgMenus/sandwiches.jpg",
          CategoryId: "4", // Sándwiches
          price: 6.95,
        },
        {
          name: "Sándwich Vegetariano",
          description: "Sándwich con aguacate, tomate, queso fresco y brotes verdes.",
          filename: "/images/ImgMenus/sandwiches.jpg",
          CategoryId: "4",
          price: 5.75,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
