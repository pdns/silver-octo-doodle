const graphql = require('graphql');
const hosts = require('../controllers/hosts');

/* eslint-disable global-require */
const gqlHost = new graphql.GraphQLObjectType({
  name: 'Host',
  fields: () => {
    const { gqlTarget } = require('./targets');
    return {
      id: { type: graphql.GraphQLID },
      name: { type: graphql.GraphQLString },
      user: { type: graphql.GraphQLString },
      address: { type: graphql.GraphQLString },
      port: { type: graphql.GraphQLInt },
      identityFile: { type: graphql.GraphQLString },
      targets: {
        type: new graphql.GraphQLList(gqlTarget),
        resolve: h => h.getTargets(),
      },
    };
  },
});
/* eslint-enable global-require */

const gqlHostInput = new graphql.GraphQLInputObjectType({
  name: 'HostInput',
  fields: {
    name: { type: graphql.GraphQLString },
    user: { type: graphql.GraphQLString },
    address: { type: graphql.GraphQLString },
    port: { type: graphql.GraphQLInt },
    identityFile: { type: graphql.GraphQLString },
  },
});

const queries = {
  getHosts: {
    type: new graphql.GraphQLList(gqlHost),
    resolve: () => hosts.getHosts(),
  },

  getHost: {
    type: gqlHost,
    args: {
      id: { type: graphql.GraphQLID },
    },
    resolve: (_, { id }) => hosts.getHost(id),
  },
};

const mutations = {
  createHost: {
    type: gqlHost,
    args: {
      input: { type: gqlHostInput },
    },
    resolve: (_, data) => hosts.createHost(data.input),
  },

};

module.exports = {
  gqlHost,
  queries,
  mutations,
};
