
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('products', {
        id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true,
        },
        name: Sequelize.STRING(100),
        price: Sequelize.DECIMAL(6,2),
        url_image: Sequelize.STRING(200),
        seller_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
         },
         onUpdate: 'CASCADE',
         onDelete: 'CASCADE'
        }
      }
    )
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('products');
  },
};