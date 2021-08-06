const { readFileSync } = require("fs");
const { join } = require("path");
const { ApolloServer } = require("apollo-server");
const post = require("./post");

const resolvers = {
  Query: {
    feed: () => post.getPosts(),
    post: (_parent, args) => post.getPost(args.id),
  },
  Mutation: {
    createPost: (_parent, args) => post.createPost(args.url, args.title),
    updatePost: (_parent, args) =>
      post.updatePost(args.id, args.url, args.title),
    deletePost: (_parent, args) => post.deletePost(args.id),
  },
};

const server = new ApolloServer({
  typeDefs: readFileSync(join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
