const { readFileSync } = require('fs');
const { join } = require('path');
const { ApolloServer } = require('apollo-server');

const posts = [{
    id: 'post-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}];

let postId = posts.length;

const resolvers = {
    Query: {
        feed: () => posts,
        post: (_parent, args) => posts.find(post => post.id === args.id),
    },
    Mutation: {
        createPost: (_parent, args) => {
            const post = {
                id: `post-${postId++}`,
                url: args.url,
                description: args.description,
            };

            posts.push(post);
            return post;
        },
        updatePost: (_parent, args) => {
            const post = posts.find(post => post.id === args.id);

            if (args.url) {
                post.url = args.url;
            }

            if (args.description) {
                post.description = args.description;
            }

            return post;
        },
        deletePost: (_parent, args) => {
            const postIndex = posts.findIndex(post => post.id === args.id);
            posts.splice(postIndex, 1);
        },
    },
};

const server = new ApolloServer({
    typeDefs: readFileSync(join(__dirname, 'schema.graphql'), 'utf8'),
    resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));