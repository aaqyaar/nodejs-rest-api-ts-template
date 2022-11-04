import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { UserModel } from "../types/user.types";

const schema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    confirmed: { type: Boolean, default: false },
    blocked: { type: Boolean, default: false },
    role: { type: Schema.Types.ObjectId, ref: "Role" },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Compare the entered password to the hashed password in the database
schema.methods.isPasswordMatch = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrpt password using bcrypt
schema.methods.encryptPassword = async function (password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Encrypt password using bcrypt before saving
schema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  user.password = await user.encryptPassword(user.password);
  next();
});

// Generate reset password token
schema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");
  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

export default model<UserModel>("User", schema);
