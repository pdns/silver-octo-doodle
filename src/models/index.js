const Sequelize = require('sequelize');
const config = require('../../config');

const sequelize = new Sequelize({
  database: config.database,
  dialect: 'sqlite',
  storage: ':memory:',
  operatorsAliases: false,
});

const initialize = async () => {
  await sequelize.authenticate();
  return sequelize.sync();
};

module.exports = { sequelize, initialize };
