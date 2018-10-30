const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const graphql = require('graphql');
const database = require('./src/models');
const graphqlSchema = require('./src/graphql-schema');

const PORT = 3000;

database.initialize().then(() => {
  const app = new Koa();
  const router = new Router();

  const schemaText = graphql.printSchema(graphqlSchema);
  fs.writeFile('schema.graphql', schemaText, (err) => {
    if (err) console.log(err);
  });

  app.use(bodyParser());
  router.post('/graphql', async (ctx) => {
    const { query, variables } = ctx.request.body;
    ctx.body = await graphql.graphql(graphqlSchema, query, undefined, undefined, variables);
  });

  app.use(router.routes());

  app.listen(PORT);
  console.log(`Listening on port ${PORT}`);
}).catch((err) => {
  console.log(err);
});
