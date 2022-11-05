import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true },
    permission: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
    menu: [{ type: Schema.Types.ObjectId, ref: "Menu" }],
  },
  {
    timestamps: true,
  }
);

export default model("Role", schema);
