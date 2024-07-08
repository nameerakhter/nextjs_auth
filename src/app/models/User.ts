import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  isForgotPasswordToken: string;
  isForgotPasswordTokenExpiry: Date;
  isVerifiedToken: string;
  isVerifiedTokenExpiry: Date;
}

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isForgotPasswordToken: String,
  isForgotPasswordTokenExpiry: Date,
  isVerifiedToken: String,
  isVerifiedTokenExpiry: Date
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);

export default UserModel;
