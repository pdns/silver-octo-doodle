const graphql = require('graphql');
const relay = require('graphql-relay');
const types = require('./types');
const hosts = require('../controllers/hosts');
const targets = require('../controllers/targets');

const CreateHost = relay.mutationWithClientMutationId({
  name: 'CreateHost',
  inputFields: {
    name: { type: graphql.GraphQLString },
    user: { type: graphql.GraphQLString },
    address: { type: graphql.GraphQLString },
    port: { type: graphql.GraphQLInt },
    identityFile: { type: graphql.GraphQLString },
  },
  outputFields: {
    hostEdge: {
      type: types.HostEdgeType,
      resolve: payload => ({ node: hosts.getHost(payload.hostId) }),
    },
    viewer: {
      type: types.UserType,
      resolve: () => ({ id: '1', name: 'User1' }),
    },
  },
  mutateAndGetPayload: async (data) => {
    const host = await hosts.createHost(data);
    return { hostId: host.id };
  },
});

const CreateTarget = relay.mutationWithClientMutationId({
  name: 'CreateTarget',
  inputFields: {
    name: { type: graphql.GraphQLString },
    from: { type: graphql.GraphQLString },
    to: { type: graphql.GraphQLString },
    hostId: { type: graphql.GraphQLID },
  },
  outputFields: {
    targetEdge: {
      type: types.TargetEdgeType,
      resolve: payload => ({ node: targets.getTarget(payload.targetId) }),
    },
    viewer: {
      type: types.UserType,
      resolve: () => ({ id: '1', name: 'User1' }),
    },
  },
  mutateAndGetPayload: async (data) => {
    const hostId = relay.fromGlobalId(data.hostId).id;
    const target = await targets.createTarget({ ...data, hostId });
    return { targetId: target.id };
  },
});

const mutation = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createHost: CreateHost,
    createTarget: CreateTarget,
  }),
});

module.exports = mutation;
