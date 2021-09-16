
import Campaign from "../../mongodb/models/Campaign";
import { IResolvers } from "@graphql-tools/utils";
import mongoose, { ObjectId } from "mongoose";
import User from "../../mongodb/models/User";

export const campaignResolvers: IResolvers = {
  Query: {
    campaigns: async (parent, args, { userId }, info) => {
      
      const campaigns = await Campaign.find({user: userId});
      console.log({campaigns});
      return campaigns;
    }
  },
  Mutation: {
    createCampaign: async (parent, args, { userId }, info) => {
      try {
        const campaignData = {
          ...args,
          owner: userId,
        }
        const campaign = new Campaign(campaignData);
        campaign.save();
        const user = await User.findById({_id: campaign.owner});
        user.campaigns.push(campaign);
        console.log(campaign.title);
        return campaign

      } catch(err)
      {
        throw new Error(`Unable to Create Campaign: ", ${args.title}`);
      }
    }
  }
};