const graphql = require('graphql');
const relay = require('graphql-relay');
const hosts = require('../controllers/hosts');
const targets = require('../controllers/targets');

const nodeTypes = {
  Host: { getById: id => hosts.getHost(id) },
  Target: { getById: id => hosts.getTarget(id) },
};

const { nodeInterface, nodeField } = relay.nodeDefinitions(
  (globalId) => {
    const { type, id } = relay.fromGlobalId(globalId);
    return nodeTypes[type].getById(id) || null;
  },
  // eslint-disable-next-line no-use-before-define
  obj => (obj.port ? HostType : TargetType),
);

const TargetStatusType = new graphql.GraphQLEnumType({
  name: 'TargetStatus',
  values: targets.statuses,
});

const TargetType = new graphql.GraphQLObjectType({
  name: 'Target',
  interfaces: [nodeInterface],
  fields: () => ({
    id: relay.globalIdField(),
    name: { type: graphql.GraphQLString },
    from: { type: graphql.GraphQLString },
    to: { type: graphql.GraphQLString },
    enabled: { type: graphql.GraphQLBoolean },
    status: { type: TargetStatusType },
    host: {
      // eslint-disable-next-line no-use-before-define
      type: HostType,
      resolve: t => t.getHost(),
    },
  }),
});

const {
  connectionType: TargetConnection,
  edgeType: TargetEdgeType,
} = relay.connectionDefinitions({
  name: 'Target',
  nodeType: TargetType,
});

const HostType = new graphql.GraphQLObjectType({
  name: 'Host',
  interfaces: [nodeInterface],
  fields: () => ({
    id: relay.globalIdField(),
    name: { type: graphql.GraphQLString },
    user: { type: graphql.GraphQLString },
    address: { type: graphql.GraphQLString },
    port: { type: graphql.GraphQLInt },
    identityFile: { type: graphql.GraphQLString },
    targets: {
      type: TargetConnection,
      args: {
        ...relay.connectionArgs,
      },
      resolve: async (host, { ...args }) => relay.connectionFromArray(await host.getTargets(), args),
    },
    targetCount: {
      type: graphql.GraphQLInt,
      resolve: async (host) => {
        const arr = await host.getTargets();
        return arr.length;
      },
    },
  }),
});

const {
  connectionType: HostConnection,
  edgeType: HostEdgeType,
} = relay.connectionDefinitions({
  name: 'Host',
  nodeType: HostType,
});

const UserType = new graphql.GraphQLObjectType({
  name: 'User',
  interfaces: [nodeInterface],
  fields: () => ({
    id: relay.globalIdField(),
    name: { type: graphql.GraphQLString },
    hosts: {
      type: HostConnection,
      args: {
        ...relay.connectionArgs,
      },
      resolve: async (_, { ...args }) => relay.connectionFromArray(await hosts.getHosts(), args),
    },
  }),
});

module.exports = {
  nodeField,
  UserType,
  HostType,
  HostEdgeType,
  TargetType,
  TargetEdgeType,
};
