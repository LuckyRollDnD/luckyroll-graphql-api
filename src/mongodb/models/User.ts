import mongoose, { Schema, Document } from 'mongoose';

// extends Document will give [_id] for IUser
export interface IUser extends Document {
  name?: string,
  email?: string,
  password?: string,
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
})

export default mongoose.model<IUser>("User", UserSchema);
