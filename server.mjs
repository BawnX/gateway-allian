import {ApolloServer} from 'apollo-server';
import {ApolloGateway, IntrospectAndCompose} from '@apollo/gateway';

const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
            {name: 'users', url: process.env.SERVICE_USER},
            {name: 'profile', url: process.env.SERVICE_PROFILE},
        ],
    })
});

const server = new ApolloServer({
    gateway,
    subscriptions: false,
    introspection: true,
});

server.listen(process.env.PORT).then(({url}) => {
    console.log(`Server ready at ${url}`);
});
