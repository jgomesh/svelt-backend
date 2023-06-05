import { Model, INTEGER, STRING, DECIMAL } from 'sequelize';
import User from './user'
import sequelize from '../instances/sequelize'

class Products extends Model {
  public id!: number;
  public name!: string;
  public price!: string;
  public url_image!: string;
  public seller_id!: number;
}

Products.init({
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
    type: DECIMAL(6,2),
  },
  url_image: {
    allowNull: false,
    type: STRING,
  },
  seller_id: {
    type: INTEGER,
    allowNull: false,
  }
}, {
  sequelize: sequelize,
  modelName: 'tsauth',
  tableName: 'products',
  timestamps: false,
});

Products.belongsTo(User, {
  foreignKey: 'seller_id',
  as: 'users'
})

Products.sync();

export default Products;