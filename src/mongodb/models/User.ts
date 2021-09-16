import mongoose, { Schema, Document} from 'mongoose';

// extends Document will give [_id] for IUser
export interface IUser extends Document {
  name?: string,
  email?: string,
  password?: string,
  campaigns?: []
}
const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  campaigns: [{
    type: Schema.Types.ObjectId,
    ref: 'Campaign',
  }]
})

export default mongoose.model<IUser>("User", UserSchema);
