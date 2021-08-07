const { readFileSync } = require("fs");
const { join } = require("path");
const { ApolloServer } = require("apollo-server");
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

const server = new ApolloServer({
  typeDefs: readFileSync(join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: ({ req }) => {
    return {
      req,
    };
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
