"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const schema_1 = require("@graphql-tools/schema");
const merge_1 = require("@graphql-tools/merge");
const fastify_1 = __importDefault(require("fastify"));
const mercurius_1 = __importDefault(require("mercurius"));
const Query_1 = require("./graphql/resolvers/Query");
const Mutations_1 = require("./graphql/resolvers/Mutations");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
// Read in Type Defs from GQL Files
const { readFileSync } = require('fs');
// we must convert the file Buffer to a UTF-8 string
const queryTypeDef = readFileSync('./src/graphql/schema/queries.gql').toString('utf-8');
const mutationTypeDef = readFileSync('./src/graphql/schema/mutations.gql').toString('utf-8');
const schemaTypeDef = readFileSync('./src/graphql/schema/schema.gql').toString('utf-8');
exports.app = (0, fastify_1.default)({ logger: true });
/**
 * Add 'mercurius' to our fastify server
 */
exports.app.register(mercurius_1.default, {
    schema: (0, schema_1.makeExecutableSchema)({
        // Merge type definitions from different sources
        typeDefs: (0, merge_1.mergeTypeDefs)([queryTypeDef, mutationTypeDef, schemaTypeDef]),
        // Merge resolvers from different sources
        resolvers: (0, merge_1.mergeResolvers)([Mutations_1.mutations, Query_1.queries]),
    }),
    // Enable the GraphQL Playground
    graphiql: 'playground',
});
const port = process.env.PORT || 8080;
const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@luckyroll.bommz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose_1.default.connect(dbURL);
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error: \n ------- \n"));
db.once("open", async function () {
    // we're connected!
    console.log("Database Connected");
    try {
        await exports.app.listen(port, '0.0.0.0');
        console.log(`Server started at`);
    }
    catch (err) {
        exports.app.log.error(err);
        process.exit(1);
    }
});
