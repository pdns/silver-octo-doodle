const graphql = require('graphql');
const targets = require('../controllers/targets');
const { gqlHost } = require('./hosts');

const StatusType = new graphql.GraphQLEnumType({
  name: 'TargetStatus',
  values: targets.statuses,
});

const gqlTarget = new graphql.GraphQLObjectType({
  name: 'Target',
  fields: {
    id: { type: graphql.GraphQLID },
    name: { type: graphql.GraphQLString },
    from: { type: graphql.GraphQLString },
    to: { type: graphql.GraphQLString },
    enabled: { type: graphql.GraphQLBoolean },
    status: { type: StatusType },
    host: {
      type: gqlHost,
      resolve: t => t.getHost(),
    },
  },
});

const gqlTargetInput = new graphql.GraphQLInputObjectType({
  name: 'TargetInput',
  fields: {
    name: { type: graphql.GraphQLString },
    from: { type: graphql.GraphQLString },
    to: { type: graphql.GraphQLString },
    hostId: { type: graphql.GraphQLID },
  },
});

const queries = {
  getTarget: {
    type: gqlTarget,
    args: {
      id: { type: graphql.GraphQLID },
    },
    resolve: (_, { id }) => targets.getTarget(id),
  },
};

const mutations = {
  createTarget: {
    type: gqlTarget,
    args: {
      input: { type: gqlTargetInput },
    },
    resolve: (_, data) => targets.createTarget(data.input),
  },
};

module.exports = {
  gqlTarget,
  queries,
  mutations,
};
