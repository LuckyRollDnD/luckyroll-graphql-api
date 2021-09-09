import mongoose, { Schema, Document } from 'mongoose';

// extends Document will give [_id] for IUser
export interface IUser extends Document {
  name: string,
}
const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    require: true
  }
})

export default mongoose.model<IUser>("User", UserSchema);
