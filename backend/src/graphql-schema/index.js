const graphql = require('graphql');
const gqlHost = require('./hosts');
const gqlTarget = require('./targets');


const query = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    ...gqlHost.queries,
    ...gqlTarget.queries,
  },
});

const mutation = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...gqlHost.mutations,
    ...gqlTarget.mutations,
  },
});

module.exports = new graphql.GraphQLSchema({ query, mutation });
