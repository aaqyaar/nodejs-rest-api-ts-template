import { Schema, model } from "mongoose";
import { PermissionModel } from "../types/permission.types";

const schema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    method: {
      type: String,
      toUpperCase: true,
      enum: ["GET", "POST", "PUT", "DELETE"],
      required: true,
    },
    route: { type: String, required: true, toLowerCase: true },
    auth: { type: Boolean, default: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default model<PermissionModel>("Permission", schema);
