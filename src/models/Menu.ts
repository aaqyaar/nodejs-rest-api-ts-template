import { Schema, model } from "mongoose";
import { MenuModel } from "../types/permission.types";

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

export default model<MenuModel>("Menu", schema);
