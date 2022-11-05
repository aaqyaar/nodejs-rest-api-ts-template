import { Schema, model } from "mongoose";
import { MenuModel } from "../types/permission.types";

const subMenu = new Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
});

const schema = new Schema(
  {
    name: { type: String, required: true },
    menu: { type: String, required: true },
    path: { type: String, required: true },
    icon: { type: String },
    type: { type: String, required: true, enum: ["menu", "subMenu"] },
    subMenu: [subMenu],
  },
  { timestamps: true }
);

export default model<MenuModel>("Menu", schema);
