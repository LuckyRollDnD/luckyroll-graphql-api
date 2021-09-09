import { IResolvers } from "@graphql-tools/utils";

const mutations: IResolvers = {
  Mutation: {
    /**
      * Simple resolver to add two numbers
      * @param {object} _
      * @param {number} x  First number
      * @param {number} y Second number
    */
    add: async (_: unknown, {x, y}: { x: number, y: number }): Promise<number> => x + y,
  },
};

export  { mutations };