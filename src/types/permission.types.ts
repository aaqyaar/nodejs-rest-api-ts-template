import mongoose from "mongoose";

export type PermissionType = {
  name: string;
  method: string;
  route: string;
  auth: boolean;
  description: string;
};

export type PermissionDocument = PermissionType & mongoose.Document;

export type PermissionModel = mongoose.Model<PermissionDocument>;
