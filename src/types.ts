import { gql } from "mercurius-codegen";

export const typeDefs = gql`
    type Query {
        """ Method to add two integers """
        add(
            " First integer "
            x: Int,
            " Second integer "
            y: Int
        ): Int
    }

    type Query {
        """ Method to substract two integers """
        subtract(
            " First integer "
            x: Int,
            " Second integer "
            y: Int
        ): Int
    }
`;