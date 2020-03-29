import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { createServer } from 'http';
import schema from './schema/index';
import { ApolloServer } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';

const app = express();

app.use('*', cors());
app.use(compression());

const server = new ApolloServer({
    schema,
    introspection: true
});

server.applyMiddleware({ app });

app.get('/', expressPlayground({
    endpoint: '/graphql'
}));

const httpServer = createServer(app);

httpServer.listen(5300, () => {
    console.log(`App listening http://localhost:5300/graphql`);
});