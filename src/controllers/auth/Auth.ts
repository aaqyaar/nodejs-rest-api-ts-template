import { Request, Response } from "express";
import User from "models/User";
import jwt from "jsonwebtoken";
import { UserDocument } from "types/user.types";

const JWT_SECRET_KEY: any = process.env.JWT_SECRET_KEY || "secret";
const JWT_EXPIRES_IN: any = process.env.JWT_EXPIRES_IN || "1d";

//@desc   Class Auth
export default class Auth {
  public static async generateToken({ _id }: any) {
    // Generate token
    const token = jwt.sign({ _id }, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRES_IN,
    });
    return token;
  }
  // @desc    Register user
  // @route   POST /api/v1/auth/register
  // @access  Public
  public static async register(req: Request, res: Response) {
    try {
      const user = await User.create<UserDocument>(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  // @desc    Login user
  // @route   POST /api/v1/auth/login
  // @access  Public
  public static async login(req: Request, res: Response) {
    try {
      const { email, password: unhashedPassword } = req.body;
      const user = await User.findOne<UserDocument>({ email }).exec();
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not exist on the server" });
      }
      const isMatch = await user.isPasswordMatch(unhashedPassword);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = await Auth.generateToken({ _id: user._id });
      const { password, ...userWithoutPassword } = user.toObject();
      const data = {
        user: userWithoutPassword,
        token,
      };
      return res.status(200).json({ user: data.user, token: data.token });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
