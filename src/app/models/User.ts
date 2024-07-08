import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document{
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isForgotPasswordToken: string;
  isForgotPasswordTokenExpiry: boolean;
  isVerifiedToken: string;
  isVerifiedTokenExpiry: boolean;
}

const userSchema: Schema<User> = new Schema({
  username:{
    type: String,
    required: [true, "Please provide a username"],
    trim: true,
    unique: true,
  },
  email:{
    type: String,
    required: [true, "Please provide a valid email"],
    unique: true
  },
  password:{
    type: String,
    required: [true, "Password is required"]
  },
  isAdmin:{
    type: Boolean,
    default: false
  },
  isForgotPasswordToken: String,
  isForgotPasswordTokenExpiry: Boolean,
  isVerifiedToken:String,
  isVerifiedTokenExpiry:Boolean,

}) 

const UserModel = (mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", userSchema))