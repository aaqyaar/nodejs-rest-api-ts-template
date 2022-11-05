import UserModel from "../models/user.model";
import RoleModel from "../models/role.model";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserDocument } from "../types/user.types";

const getRolePermissions = async (_id: string) => {
  const roleData: any = await RoleModel.findOne({ _id })
    .populate("permission")
    .exec();
  return { permissions: roleData.permission };
};

const isTokenValid = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    return decoded;
  } catch (error) {
    return false;
  }
};

interface Req extends Request {
  user: any;
}

export const isAuth = async (req: any, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  // Check if token is sent
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  const decoded = isTokenValid(token);
  // Check if token is valid
  if (!decoded) {
    return res
      .status(401)
      .json({ error: "Token is not valid, try valid token." });
  }
  // Check if user exists
  const user: UserDocument = (await UserModel.findById(
    decoded
  )) as UserDocument;
  if (!user) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  // Check if user is blocked
  if (user.blocked) {
    return res.status(401).json({ error: "You are blocked" });
  }
  req.user = user;
  next();
};

export const isAuthorized = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.user;
    const user: any = (await UserModel.findOne({ email }).populate(
      "role"
    )) as UserDocument;
    const { permissions } = await getRolePermissions(user.role._id);

    const isAuthorized = permissions.some((permission: any) =>
      req.originalUrl.includes(permission.route)
    );
    if (!isAuthorized) {
      return res.status(401).json({ error: "You are not authorized" });
    }

    next();
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
