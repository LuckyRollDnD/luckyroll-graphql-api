
import dotenv from "dotenv";
import { Secret } from "jsonwebtoken"
dotenv.config();

interface ISecret {
  secret: Secret | undefined
}
const databaseURL: string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@luckyroll.bommz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const secret = process.env.SECRET || "";

export {
  databaseURL,
  secret
}