import {makeExecutableSchema} from '@graphql-tools/schema';
import {mergeTypeDefs, mergeResolvers} from '@graphql-tools/merge';
import fastify, {FastifyInstance} from 'fastify';
import {Server, IncomingMessage, ServerResponse} from 'http';
import mercurius from 'mercurius';

import { queries } from './resolvers/Query';
import { typeDefs } from './types';
/**
 * Create instance of our Fastify server
 * We need to export it here so we can easily use it in our automated tests
 */
export const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({logger: false});


/**
 * Add 'mercurius' to our fastify server
 */
app.register(mercurius, {
    schema: makeExecutableSchema({
        // Merge type definitions from different sources
        typeDefs: mergeTypeDefs([typeDefs]),
        // Merge resolvers from different sources
        // resolvers: mergeResolvers([resolvers, resolvers2]),
        resolvers: mergeResolvers([queries])
    }),
    // Enable the GraphQL Playground
    graphiql: 'playground',
});

const port = process.env.PORT || 8080;

// Start server
const start = async (): Promise<void> => {
    try {
        await app.listen(port, '0.0.0.0');
        console.log(`Listening on port ${port}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
