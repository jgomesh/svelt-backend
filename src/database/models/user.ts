import { Model, INTEGER, STRING } from 'sequelize';
import sequelize from '../instances/sequelize'

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public name!: string;
  public role!: string;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,  
  },
  email: {
    allowNull: false,
    unique: true,
    type: STRING,
  },
  password: {
    allowNull: false,
    type: STRING,
  },
  name: {
    allowNull: false,
    type: STRING,
  },
  role: {
    allowNull: false,
    type: STRING
  }
}, {
  sequelize: sequelize,
  modelName: 'tsauth',
  tableName: 'users',
  timestamps: false,
});

export default User;