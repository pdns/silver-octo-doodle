const graphql = require('graphql');
const types = require('./types');

const query = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: types.nodeField,
    viewer: {
      type: types.UserType,
      resolve: () => ({ id: '1', name: 'User1' }),
    },
  }),
});

module.exports = query;
