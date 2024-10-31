module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      {
        id: 1,
        name: "Zumos",
        image: '/images/ImgMenus/bebidas.jpg'
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Refrescos",
        image: '/images/ImgMenus/bebidas.jpg'
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        id: 3,
        name: "Bocadillos",
        image: '/images/ImgMenus/bebidas.jpg'
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
