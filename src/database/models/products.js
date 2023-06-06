const { Model, INTEGER, STRING, DECIMAL } = require('sequelize');
const User = require('./user');
const sequelize = require('../instances/sequelize');

class Products extends Model {}

Products.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    name: {
      allowNull: false,
      unique: true,
      type: STRING,
    },
    price: {
      allowNull: false,
      type: DECIMAL(6, 2),
    },
    url_image: {
      allowNull: false,
      type: STRING,
    },
    seller_id: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'tsauth',
    tableName: 'products',
    timestamps: false,
  }
);

Products.belongsTo(User, {
  foreignKey: 'seller_id',
  as: 'users',
});

Products.sync();

module.exports = Products;
