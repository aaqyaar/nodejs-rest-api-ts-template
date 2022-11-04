import mongoose from "mongoose";

export type PermissionType = {
  name: string;
  method: string;
  route: string;
  auth: boolean;
  description: string;
};
export type MenuType = {
  name: string;
  method: string;
  route: string;
  auth: boolean;
  description: string;
};

export type PermissionDocument = PermissionType & mongoose.Document;
export type MenuDocument = MenuType & mongoose.Document;

export type PermissionModel = mongoose.Model<PermissionDocument>;

export type MenuModel = mongoose.Model<MenuDocument>;
