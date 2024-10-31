module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      {
        id: 1,
        name: "Electronics",
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Books",
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        id: 3,
        name: "Clothing",
        // createdAt: new Date(),
        // updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Elimina todos los registros de la tabla 'categories'
    return queryInterface.bulkDelete('categories', null, {});
  }
};
