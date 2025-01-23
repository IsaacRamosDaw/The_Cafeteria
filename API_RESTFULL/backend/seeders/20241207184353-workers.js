'use strict';

const { generateToken } = require("../utils");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const workers = [
      {
        username: "worker1",
        password: "$2a$12$C65edLxRXj5DmjJDYg9qde0kUuim/HWHl1kSC9iORRRhrhv2VwkqC",
        phone: "902 196 705",
        filename: "img-test.jpeg"
      },
      {
        username: "worker2",
        password: "$2a$12$C65edLxRXj5DmjJDYg9qde0kUuim/HWHl1kSC9iORRRhrhv2VwkqC",
        phone: "902 196 705",
        filename: "img-test.jpeg"
      },
      {
        username: "worker3",
        password: "$2a$12$C65edLxRXj5DmjJDYg9qde0kUuim/HWHl1kSC9iORRRhrhv2VwkqC",
        phone: "902 196 705",
        filename: "img-test.jpeg"
      },
    ];

    await queryInterface.bulkInsert("workers", workers, {});

    const insertedWorkers = await queryInterface.sequelize.query(
      `SELECT id, username, role FROM workers`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    insertedWorkers.forEach((worker) => {
      const token = generateToken(worker);
      console.log(`Token for ${worker.username}: ${token}`);
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("workers", null, {});
  }
};
