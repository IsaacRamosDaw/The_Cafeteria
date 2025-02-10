"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const fullDate = `${year}-${month}-${day} 00:00:00`;

    const orders = [
      {
        date: fullDate,
        status: "ready",
        studentId: 1,
      },
      {
        date: fullDate,
        status: "ready",
        studentId: 2,
      },
      {
        date: fullDate,
        status: "ready",
        studentId: 3,
      },
    ];

    // Insert data
    await queryInterface.bulkInsert("orders", orders, {});

    const insertedOrders = await queryInterface.sequelize.query(
      `SELECT id, date, status, StudentId FROM orders`,
      { type: Sequelize.QueryTypes.SELECT }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("orders", null, {});
  },
};

// npx sequelize-cli seed:generate --name
// npx sequelize-cli db:seed --seed 20250206002828-orders-seeder.js
// npx sequelize-cli db:seed:all
