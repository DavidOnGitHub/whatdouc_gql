
const app = require('express')();
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { decode } = require('./utils/authUtils');
const rest = require('./rest');
const { setupDb } = require('./setup');
const models = require('./models');
const { secure } = require('./directives');

setupDb();

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: models.schema,
    resolvers: models.resolver,
    schemaDirectives: {
      secure
    }
  }),
  // debug: false,
  context: ({ req }) => {
    const [bearer, jwt] = (req.headers.authorization || '').split(' ');
    if (bearer === 'Bearer') {
      const user = decode(jwt);
      return { user };
    }
    return {};
  },
});

app.use(require('cors')());
app.use(require('body-parser').json());
app.use('/rest', rest);

server.applyMiddleware({ app });

app.listen({ port: 4000 }, console.log('server ready at http://localhost:4000'));
