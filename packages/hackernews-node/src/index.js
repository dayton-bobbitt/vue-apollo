const { readFileSync } = require("fs");
const { join } = require("path");
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Post = require("./resolvers/Post");

const resolvers = {
  Query,
  Mutation,
  User,
  Post,
};

/**
 * Start ApolloServer using `apollo-server-express` in order to enable
 * subscriptions and allow us to provide define our own express middleware
 * 
 * @see https://www.apollographql.com/docs/apollo-server/integrations/middleware/#swapping-out-apollo-server
 */
async function startApolloServer() {

  const app = express();
  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    typeDefs: readFileSync(join(__dirname, "schema.graphql"), "utf8"),
    resolvers,
    context: ({ req }) => {
      return {
        req,
      };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    path: "/"
  });

  const port = 4000;
  await new Promise(resolve => httpServer.listen({ port }, resolve));
  console.log(`Server is running on http://localhost:${port}${apolloServer.graphqlPath}`);
}

startApolloServer();