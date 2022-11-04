import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    permission: { type: Schema.Types.ObjectId, ref: "Permission" },
    menu: { type: Schema.Types.ObjectId, ref: "Menu" },
  },
  {
    timestamps: true,
  }
);

export default model("Role", schema);
