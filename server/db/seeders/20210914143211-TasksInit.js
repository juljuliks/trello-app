module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tasks', [
      {
        columnId: 1,
        body: 'Take out the garbage',
      },
      {
        columnId: 1,
        body: 'Watch my favorite show',
      },
      {
        columnId: 1,
        body: 'Charge my phone',
      },
      {
        columnId: 1,
        body: 'Cook dinner',
      },
      {
        columnId: 4,
        body: 'Take out the garbage',
      },
      {
        columnId: 4,
        body: 'Watch my favorite show',
      },
      {
        columnId: 4,
        body: 'Charge my phone',
      },
      {
        columnId: 4,
        body: 'Cook dinner',
      },
      {
        columnId: 7,
        body: 'Take out the garbage',
      },
      {
        columnId: 7,
        body: 'Watch my favorite show',
      },
      {
        columnId: 7,
        body: 'Charge my phone',
      },
      {
        columnId: 7,
        body: 'Cook dinner',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};
