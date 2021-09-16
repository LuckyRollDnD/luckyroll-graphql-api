// import { createToken, encryptPassword, comparePassword } from "../../utils/index";
import bcrypt from 'bcryptjs';
import User from "../../mongodb/models/User";
import { secret } from '../../config/variables';
import { IResolvers } from "@graphql-tools/utils";
import { AuthenticationError } from "apollo-server-errors";
import { sign } from "jsonwebtoken";


export const userResolvers: IResolvers = {
  Query: {
    me: async (parent, args, { userId }, info) => {

      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new AuthenticationError("Cannot Find User");
        }
        return {
            email: user.email,
            id: user.id
        } 

      } catch(err) {
        throw new AuthenticationError("Issue with Logging In");
      }
    }
  },
  Mutation: {
    signup: async (parent, args, ctx, info) => {
      const user = await User.findOne({email: args.email});
      
      if (user) {
        throw new AuthenticationError("User Already Exists!")
      }

      try {
        // encrypt password
        const password = await bcrypt.hash(args.password, 10);

        const userData = { 
          ...args,
          password
        }
        const newUser = new User(userData);
        const user = await newUser.save();
        const token = sign({ id: user._id }, 
          secret, 
          {
          expiresIn: 604800,
          }
        );
        
        return { 
          user,
          token
        };

      } catch (e) {
          throw e
      }
    },
    login: async (parent, {email, password}, ctx, info) => {
      const user: any = await User.findOne({email});
      if (!user) {
        throw new AuthenticationError("Could Not Find User.");
      }
      
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) {
        throw new AuthenticationError("Wrong Password.");
      }
      
      const token = sign({ id: user._id }, 
        secret,
        {
          expiresIn: 604800,
        }
        );
        
        return {
          user,
          token
        };
      }
  },
}