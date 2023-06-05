import { Model, INTEGER } from 'sequelize';
import Sale from './sales';
import Product from './products';
import sequelize from '../instances/sequelize';

class SaleProduct extends Model {
  sale_id: number;
  product_id: number;
  quantity: number;
}

SaleProduct.init({
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
  sequelize: sequelize,
  modelName: 'tsauth',
  tableName: 'sale_product',
  timestamps: false,
  underscored: true,
});

Sale.belongsToMany(Product,
  { 
    as: 'products',
    through: SaleProduct,
    foreignKey: 'sale_id',
    otherKey: 'product_id',
  }
);

Product.belongsToMany(Sale,
  {
    as: 'sales',
    through: SaleProduct,
    foreignKey: 'product_id',
    otherKey: 'sale_id',
  }
);

SaleProduct.belongsTo(Product, { foreignKey: 'product_id', as: 'product' }); // Define a associação entre SaleProduct e Product


SaleProduct.sync();

export default SaleProduct;