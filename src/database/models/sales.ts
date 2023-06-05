import { Model, INTEGER, STRING, DECIMAL, DATE, NOW } from 'sequelize';
import User from './user'
import sequelize from '../instances/sequelize'

class Sales extends Model {
  public id!: number;
  public user_id: number;
  public selled_id: number;
  public total_price!: string | number;
  public delivery_address!: string;
  public delivery_number!: string;
  public sale_date!: Date | string;
  public status!:string;
}


Sales.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,  
  },
  user_id: {
    type: INTEGER,
    allowNull: false,
  },
  seller_id: {
    type: INTEGER,
    allowNull: false,
  },
  total_price: {
    type: DECIMAL(9,2),
    allowNull: false,
  },
  delivery_address: {
    type: STRING,
    allowNull: false,
  },
  delivery_number: {
    type: STRING,
    allowNull: false,
  },
  sale_date: {
    type: DATE,
    allowNull: false,
    defaultValue: NOW,
  },
  status: {
    type: STRING,
    allowNull: false,
  }
},
{
  sequelize: sequelize,
  modelName: 'tsauth',
  tableName: 'sales',
  timestamps: false,
});

Sales.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'users'
})

Sales.belongsTo(User, {
  foreignKey: 'seller_id',
  as: 'seller'
})

Sales.sync();

export default Sales;