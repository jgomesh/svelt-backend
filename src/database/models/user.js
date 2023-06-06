const { Model, INTEGER, STRING } = require('sequelize');
const sequelize = require('../instances/sequelize');

class User extends Model {}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER
    },
    email: {
      allowNull: false,
      unique: true,
      type: STRING
    },
    password: {
      allowNull: false,
      type: STRING
    },
    name: {
      allowNull: false,
      type: STRING
    },
    role: {
      allowNull: false,
      type: STRING
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  }
);

module.exports = User;
