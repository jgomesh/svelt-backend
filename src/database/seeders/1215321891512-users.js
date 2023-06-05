
module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users',
      [{
        name: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
        password: '$2b$10$8XxY5TBqHQBbLBelI1HUx.DarrSnZpma0AolVPgPs/iXaD8e5yx1C',
        role: "admin"
      },
      {
        name: 'Michael Schumacher',
        email: 'MichaelSchumacher@gmail.com',
        password: '$2b$10$8XxY5TBqHQBbLBelI1HUx.DarrSnZpma0AolVPgPs/iXaD8e5yx1C',
        role: "user"
      },
      {
        name: 'Hugo Store',
        email: 'hugostore@gmail.com',
        password: '$2b$10$8XxY5TBqHQBbLBelI1HUx.DarrSnZpma0AolVPgPs/iXaD8e5yx1C',
        role: "seller"
      },
      {
        name: 'Aerre Store',
        email: 'aerrestore@gmail.com',
        password: '$2b$10$8XxY5TBqHQBbLBelI1HUx.DarrSnZpma0AolVPgPs/iXaD8e5yx1C',
        role: "seller"
      }
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};