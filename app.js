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

  app.use(bodyParser());
  router.post('/graphql', async (ctx) => {
    ctx.body = await graphql.graphql(graphqlSchema, ctx.request.body.query);
  });

  app.use(router.routes());

  app.listen(PORT);
  console.log(`Listening on port ${PORT}`);
}).catch((err) => {
  throw err;
});
