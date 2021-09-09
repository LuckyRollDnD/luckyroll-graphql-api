import { IResolvers } from "@graphql-tools/utils";

const queries: IResolvers = {
  Query: {
      /**
       * Simple resolver to subtract two numbers
       * @param {object} _
       * @param {number} x  First number
       * @param {number} y Second number
       */
      subtract: async (_: unknown, {x, y}: { x: number, y: number }): Promise<number> => x - y,

  },
};

export  { queries };