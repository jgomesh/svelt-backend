const { Model, INTEGER } = require('sequelize');
const Sale = require('./sales');
const Product = require('./products');
const sequelize = require('../instances/sequelize');

class SaleProduct extends Model {}

SaleProduct.init(
  {
    sale_id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    product_id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    quantity: {
      type: INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'SaleProduct',
    tableName: 'sale_product',
    timestamps: false,
    underscored: true
  }
);

Sale.belongsToMany(Product, {
  as: 'products',
  through: SaleProduct,
  foreignKey: 'sale_id',
  otherKey: 'product_id',
});

Product.belongsToMany(Sale, {
  as: 'sales',
  through: SaleProduct,
  foreignKey: 'product_id',
  otherKey: 'sale_id',
});

SaleProduct.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

SaleProduct.sync();

module.exports = SaleProduct;
