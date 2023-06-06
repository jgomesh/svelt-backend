const Sequelize = require('sequelize');
const config = require('../../config/config');
require('dotenv/config');

const sequelize = new Sequelize(config);

sequelize.authenticate();

module.exports = sequelize;
