import {makeExecutableSchema} from '@graphql-tools/schema';
import {mergeTypeDefs, mergeResolvers} from '@graphql-tools/merge';
import fastify, {FastifyInstance} from 'fastify';
import {Server, IncomingMessage, ServerResponse} from 'http';
import mercurius from 'mercurius';
import {gql} from 'mercurius-codegen';
import {queries} from "./resolvers/Query"
import { mutations } from './resolvers/Mutations';


 // Read in Type Defs from GQL Files
const { readFileSync } = require('fs')
 // we must convert the file Buffer to a UTF-8 string
const queryTypeDef = readFileSync('./src/graphql/schema/queries.gql').toString('utf-8')
const mutationTypeDef = readFileSync('./src/graphql/schema/mutations.gql').toString('utf-8')
const schemaTypeDef = readFileSync('./src/graphql/schema/schema.gql').toString('utf-8')

 
export const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({logger: false});

/**
 * Add 'mercurius' to our fastify server
 */
app.register(mercurius, {
    schema: makeExecutableSchema({
        // Merge type definitions from different sources
        typeDefs: mergeTypeDefs([queryTypeDef,mutationTypeDef, schemaTypeDef]),
        // Merge resolvers from different sources
        resolvers: mergeResolvers([mutations, queries]),
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
