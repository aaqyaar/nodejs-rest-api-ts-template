import mongoose from "mongoose";

export type PermissionType = {
  name: string;
  method: any;
  route: string;
  auth: boolean;
  description: string;
};
interface subMenu {
  name: string;
  path: string;
}
export type MenuType = {
  name: string;
  menu: string;
  type: string;
  path: string;
  subMenu: subMenu[];
};

export type PermissionDocument = PermissionType & mongoose.Document;
export type MenuDocument = MenuType & mongoose.Document;

export type PermissionModel = mongoose.Model<PermissionDocument>;

export type MenuModel = mongoose.Model<MenuDocument>;
