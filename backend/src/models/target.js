const Sequelize = require('sequelize');
const { sequelize } = require('.');

const statuses = {
  PASSING: {
    value: 'PASSING',
  },
  FAILING: {
    value: 'FAILING',
  },
  NEW: {
    value: 'NEW',
  },
};

const Target = sequelize.define(
  'target',
  {
    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    name: { type: Sequelize.STRING },
    from: { type: Sequelize.STRING },
    to: { type: Sequelize.STRING },
    enabled: { type: Sequelize.BOOLEAN, defaultValue: true },
    status: {
      type: Sequelize.ENUM(Object.values(statuses).map(s => s.value)),
      defaultValue: statuses.NEW.value,
    },
  },
);

Target.statuses = statuses;
module.exports = Target;
