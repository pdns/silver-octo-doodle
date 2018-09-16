const Target = require('../models/target');

const getTarget = async id => Target.findById(id);

const createTarget = async (data) => {
  if (!data.hostId) {
    throw new Error('missing host ID');
  }

  return Target.create(data);
};

module.exports = {
  getTarget,
  createTarget,
  statuses: Target.statuses,
};
