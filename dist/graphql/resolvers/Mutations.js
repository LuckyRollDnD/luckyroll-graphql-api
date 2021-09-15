"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
const mutations = {
    Mutation: {
        /**
          * Simple resolver to add two numbers
          * @param {object} _
          * @param {number} x  First number
          * @param {number} y Second number
        */
        add: async (_, { x, y }) => x + y,
    },
};
exports.mutations = mutations;
