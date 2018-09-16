const Sequelize = require('sequelize');
const { sequelize } = require('.');
const Target = require('./target');

const Host = sequelize.define(
  'host',
  {
    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    name: { type: Sequelize.STRING },
    user: { type: Sequelize.STRING },
    address: { type: Sequelize.STRING },
    port: { type: Sequelize.SMALLINT },
    identityFile: { type: Sequelize.STRING },
  },
);
Host.hasMany(Target, { as: 'Targets' });
Target.belongsTo(Host);

module.exports = Host;
