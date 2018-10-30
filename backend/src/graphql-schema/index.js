const graphql = require('graphql');
const query = require('./query');
const mutation = require('./mutation');

module.exports = new graphql.GraphQLSchema({ query, mutation });
