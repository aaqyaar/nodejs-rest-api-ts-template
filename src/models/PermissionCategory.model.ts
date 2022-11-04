import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true },
    menu: { type: String, required: true },
    path: { type: String, required: true },
    icon: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

export default model("PermissionCategory", schema);
