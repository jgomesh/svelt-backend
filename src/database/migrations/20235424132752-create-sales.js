
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('sales', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
       },
       onUpdate: 'CASCADE',
       onDelete: 'CASCADE'
      },
      seller_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
       },
       onUpdate: 'CASCADE',
       onDelete: 'CASCADE'
      },
      total_price: Sequelize.STRING,
      delivery_address: Sequelize.STRING(100),
      delivery_number: Sequelize.STRING(50),
      sale_date: Sequelize.STRING,
      status: Sequelize.STRING(50)
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('sales');
  },
};