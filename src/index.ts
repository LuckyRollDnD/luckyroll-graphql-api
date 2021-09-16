import mongoose from "mongoose";
import { databaseURL } from "./config/variables";
// import { getPayload } from "./utils/index";
import { ApolloServer } from "apollo-server";
import Resolvers from "./graphql/resolvers/index";

 // Read in Type Defs from GQL Files
const { readFileSync } = require('fs')
 // we must convert the file Buffer to a UTF-8 string
const queryTypeDef = readFileSync('./src/graphql/schema/queries.gql').toString('utf-8')
const mutationTypeDef = readFileSync('./src/graphql/schema/mutations.gql').toString('utf-8')
const schemaTypeDef = readFileSync('./src/graphql/schema/schema.gql').toString('utf-8')
import {  Jwt, JwtPayload, verify } from "jsonwebtoken";
import { secret } from "./config/variables";
import User from "./mongodb/models/User";
const typeDefs = [queryTypeDef, mutationTypeDef, schemaTypeDef] 

// get the user info from a JWT
const getUser = (token: string): string | JwtPayload => {
    if (token) {
        try {
            // return the user information from the token
            return verify(token, secret);
        } catch (err) {
            // if there's a problem with the token, throw an error
            throw new Error('Session invalid');
        }
    }
    return "";
}
interface UserPayload extends JwtPayload {
    id: string
}
const app = new ApolloServer({
    typeDefs,
    resolvers: Resolvers,
    context: ({ req }) => {
        
        // get the user token from the headers
        const auth = req.headers.authorization || '';
        const token = auth.split("Bearer ")[1];
        const user = getUser(token) as UserPayload;
        
        return { userId: user.id }
    }
})


const port = process.env.PORT || 8080;


mongoose.connect(databaseURL);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: \n ------- \n"));
db.once("open", function () {
	// we're connected!
	console.log("Database Connected");
    try {
        console.log(`Server started at`);
          app
            .listen({port})
            .then(({url}) => console.log(`Server started at: ${url}`));
        
    }
    catch(err) {
        console.error("App Failed to start")
        console.error("Error")
        console.error("----------")
        console.error(err);
        process.exit(1);
    }
});

