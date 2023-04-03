import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

import express from 'express';
import http from 'http';

import Schema from './types/article';
import Resolvers from './Resolvers';

async function startApolloServer(schema: any, resolvers: any) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  }) as any;

  await server.start();

  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;
  await new Promise<void>(resolve => httpServer.listen({ port }, resolve));

  console.log(`🚀 Apollo Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(Schema, Resolvers);
