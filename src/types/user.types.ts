import mongoose from "mongoose";

export type User = {
  email: string;
  password: string;
  name: string;
  avatar: string;
  confirmed: boolean;
  blocked: boolean;
  role: string;
  resetPasswordToken: string | undefined;
  resetPasswordExpire: Date | any;
};

interface UserMethods {
  isPasswordMatch: (enteredPassword: string) => Promise<boolean>;
  encryptPassword: (password: string) => Promise<string>;
  getResetPasswordToken: () => string;
}

export type UserDocument = User & mongoose.Document & UserMethods;

export type UserModel = mongoose.Model<UserDocument>;
