const { Model, INTEGER, STRING, DECIMAL, DATE, NOW } = require('sequelize');
const User = require('./user');
const sequelize = require('../instances/sequelize');

class Sales extends Model {
  constructor(values, options) {
    super(values, options);
    this.user_id = 0;
    this.seller_id = 0;
  }
}

Sales.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER
    },
    user_id: {
      type: INTEGER,
      allowNull: false
    },
    seller_id: {
      type: INTEGER,
      allowNull: false
    },
    total_price: {
      type: DECIMAL(9, 2),
      allowNull: false
    },
    delivery_address: {
      type: STRING,
      allowNull: false
    },
    delivery_number: {
      type: STRING,
      allowNull: false
    },
    sale_date: {
      type: DATE,
      allowNull: false,
      defaultValue: NOW
    },
    status: {
      type: STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Sales',
    tableName: 'sales',
    timestamps: false
  }
);

Sales.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'users'
});

Sales.belongsTo(User, {
  foreignKey: 'seller_id',
  as: 'seller'
});

Sales.sync();

module.exports = Sales;
