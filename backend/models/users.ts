import mongoose, { Types } from "mongoose";

export interface IUserSnippet {
  name: string,
  user_type: 'manufacturer' | 'transporter'
}
export interface IUser extends IUserSnippet {
  _id: Types.ObjectId,
  emailVerfied: boolean,
  email?: string,
  user_type: 'manufacturer' | 'transporter'
}
export interface IUserCreate {
  name: string,
  emailVerfied: boolean,
  email: string,
  password?: string,
  user_type: 'manufacturer' | 'transporter'
}
export interface IUserStored extends IUserSnippet {
  _id: Types.ObjectId,
  emailVerfied: boolean,
  email: string,
  password?: string,
} 

const userSchema = new mongoose.Schema<IUserStored>({
  name: { type: String, required: true, maxLength: 50, minlength: 3 },
  email: { type: String, unique: true, maxLength: 50, minlength: 3 },
  password: { type: String, maxLength: 100, minlength: 5 },
  emailVerfied: { type: Boolean, default: false },
  user_type: {type : String, enum : ['manufacturer','transporter'], required : true},
})

const User = mongoose.model<IUserStored>("User", userSchema);
export default User;