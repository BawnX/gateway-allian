import {ApolloServer} from 'apollo-server';
import {ApolloGateway, IntrospectAndCompose} from '@apollo/gateway';

const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
            {name: 'users', url: 'https://gin-production-44b2.up.railway.app/query'},
            // {name: 'profile', url: 'http://localhost:4002/query'},
        ],
    })
});

const server = new ApolloServer({
    gateway,
    subscriptions: false,
});

server.listen(process.env.PORT).then(({url}) => {
    console.log(`Server ready at ${url}`);
});
