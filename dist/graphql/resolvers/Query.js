"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
const queries = {
    Query: {
        /**
         * Simple resolver to subtract two numbers
         * @param {object} _
         * @param {number} x  First number
         * @param {number} y Second number
         */
        subtract: async (_, { x, y }) => x - y,
    },
};
exports.queries = queries;
