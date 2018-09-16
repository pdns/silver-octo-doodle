const Host = require('../models/host');

const getHosts = async () => Host.findAll();

const getHost = async id => Host.findById(id);

const createHost = async data => Host.create(data);

module.exports = {
  getHosts,
  getHost,
  createHost,
};
