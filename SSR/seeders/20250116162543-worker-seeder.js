'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("workers",
      [
        {
          username: "worker1",
          password: "$2a$12$C65edLxRXj5DmjJDYg9qde0kUuim/HWHl1kSC9iORRRhrhv2VwkqC",
          phone: "902 196 705",
          filename: "file.jpg",
        },
        {
          username: "worker2",
          password: "$2a$12$C65edLxRXj5DmjJDYg9qde0kUuim/HWHl1kSC9iORRRhrhv2VwkqC",
          phone: "902 196 705",
          filename: "file.jpg",
        },
        {
          username: "worker3",
          password: "$2a$12$C65edLxRXj5DmjJDYg9qde0kUuim/HWHl1kSC9iORRRhrhv2VwkqC",
          phone: "902 196 705",
          filename: "file.jpg",
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("workers", null, {});
  }
};
