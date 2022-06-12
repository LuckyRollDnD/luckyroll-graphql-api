import mongoose, { Schema, Document } from 'mongoose';

import {IUser} from "./User";

export interface ICampaign extends Document {
  title: string,
  description: string,
  owner: IUser['_id'],
}
const CampaignSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: false
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
})

export default mongoose.model<ICampaign>('Campaign', CampaignSchema);
