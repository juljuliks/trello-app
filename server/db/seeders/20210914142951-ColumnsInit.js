module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Columns', [
      {
        boardId: 1,
        title: 'To Do',
      },
      {
        boardId: 1,
        title: 'In Progress',
      },
      {
        boardId: 1,
        title: 'Done',
      },
      {
        boardId: 2,
        title: '2To Do',
      },
      {
        boardId: 2,
        title: '2In Progress',
      },
      {
        boardId: 2,
        title: '2Done',
      },
      {
        boardId: 3,
        title: '2blaTo Do',
      },
      {
        boardId: 3,
        title: '2bla In Progress',
      },
      {
        boardId: 3,
        title: '2bla Done',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Columns', null, {});
  },
};
