"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/index.ts
var _schema = require('@graphql-tools/schema');
var _merge = require('@graphql-tools/merge');
var _fastify = require('fastify'); var _fastify2 = _interopRequireDefault(_fastify);
var _mercurius = require('mercurius'); var _mercurius2 = _interopRequireDefault(_mercurius);
var _mercuriuscodegen = require('mercurius-codegen');
var app = _fastify2.default.call(void 0, { logger: false });
var typeDefs = _mercuriuscodegen.gql`
    type Query {
        """ Method to add two integers """
        add(
            " First integer "
            x: Int,
            " Second integer "
            y: Int
        ): Int
    }
`;
var typeDefs2 = _mercuriuscodegen.gql`
    type Query {
        """ Method to substract two integers """
        sub(
            " First integer "
            x: Int,
            " Second integer "
            y: Int
        ): Int
    }
`;
var resolvers = {
  Query: {
    add: async (_, { x, y }) => x + y
  }
};
var resolvers2 = {
  Query: {
    sub: async (_, { x, y }) => x - y
  }
};
app.register(_mercurius2.default, {
  schema: _schema.makeExecutableSchema.call(void 0, {
    typeDefs: _merge.mergeTypeDefs.call(void 0, [typeDefs, typeDefs2]),
    resolvers: _merge.mergeResolvers.call(void 0, [resolvers, resolvers2])
  }),
  graphiql: "playground"
});
var port = process.env.PORT || 8080;
var start = async () => {
  try {
    await app.listen(port, "0.0.0.0");
    console.log(`Listening on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();


exports.app = app;
