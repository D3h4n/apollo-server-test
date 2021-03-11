import { ApolloServer, gql } from 'apollo-server-express';
import fs from 'fs';
import path from 'path';
import CommonRoute from '../common/common.routes.config';
import resolvers from './resolvers';

export default class GraphQLRoute extends CommonRoute {
  configureRoutes() {
    const typeDefs = gql(
      fs.readFileSync(path.join(process.cwd(), 'schema', 'schema.graphql'), {
        encoding: 'utf8',
      })
    );

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req, res }) => ({ req, res }),
      playground: {
        settings: {
          'request.credentials': 'same-origin',
        },
      },
    });

    server.applyMiddleware({ app: this.app, path: this.name });
  }
}
