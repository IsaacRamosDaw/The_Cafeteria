"use strict";

const { generateToken } = require("../utils");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Datos iniciales de los usuarios
    const coffeshops = [
      {
        name: "Rincon's Mug",
        filename: "img-test.jpeg"
      },
    ];

    // Inserta los datos iniciales
    await queryInterface.bulkInsert("coffeshops", coffeshops, {});

    // Recupera los usuarios insertados para generar los tokens
    const insertedSchools = await queryInterface.sequelize.query(
      `SELECT id, name, filename FROM coffeshops`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Genera tokens para cada colegio y muestra en consola (o los guardas)
    insertedSchools.forEach((coffeShop) => {
      const token = generateToken(coffeShop);
      console.log(`Token for ${coffeShop.username}: ${token}`);
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("coffeshops", null, {});
  },
};

// npx sequelize-cli db:seed --seed 20241209133620-coffeShop-seeder.js
// npx sequelize-cli db:seed:all 
