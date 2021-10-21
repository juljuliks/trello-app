module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Boards', [
      {
        userId: 1,
        title: 'Project',
      },
      {
        userId: 2,
        title: 'My board',
      },
      {
        userId: 2,
        title: 'My board2',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Boards', null, {});
  },
};
