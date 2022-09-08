const { ApolloServer } = require('apollo-server');
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'users', url: 'http://localhost:4001/query' },
      { name: 'profile', url: 'http://localhost:4002/query' },
    ],
  })
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
