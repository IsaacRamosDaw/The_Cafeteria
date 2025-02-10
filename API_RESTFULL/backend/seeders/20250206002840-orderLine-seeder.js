"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const orderLines = [
      {
        quantity: 4,
        unitPrice: 5.2,
        orderId: 1,
        productId: 3,
      },
      {
        quantity: 2,
        unitPrice: 8.99,
        orderId: 1,
        productId: 4,
      },
      {
        quantity: 5,
        unitPrice: 12.5,
        orderId: 1,
        productId: 5,
      },
      {
        quantity: 1,
        unitPrice: 7.35,
        orderId: 2,
        productId: 1,
      },
      {
        quantity: 3,
        unitPrice: 6.75,
        orderId: 2,
        productId: 2,
      },
      {
        quantity: 6,
        unitPrice: 9.99,
        orderId: 3,
        productId: 6,
      }
    ]

    // Insert data
    await queryInterface.bulkInsert("orderLines", orderLines, {});

    // Verifica los datos insertados
    const insertedOrdersLines = await queryInterface.sequelize.query(
      `SELECT id, quantity, unitPrice, orderId, productId FROM orderLines`, // Usa orderId y productId (minúscula)
      { type: Sequelize.QueryTypes.SELECT }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("orderLines", null, {});
  },
};

// npx sequelize-cli db:seed --seed 20250206002840-orderLine-seeder.js