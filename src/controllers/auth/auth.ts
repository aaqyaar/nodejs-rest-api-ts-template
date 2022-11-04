import { Request, Response } from "express";
import UserModel from "../../models/user.model";
import jwt from "jsonwebtoken";
import { UserDocument } from "../../types/user.types";
import { sendEmail } from "../../documents/nodemailer";
import { emailTemplate } from "../../documents/email";

interface EMAIL_OPTIONS {
  to: string;
  subject: string;
  text: string;
}
// Class Auth
export default class Auth {
  // @desc JWT variables
  private static JWT_SECRET_KEY: any = process.env.JWT_SECRET_KEY || "secret";
  private static JWT_EXPIRES_IN: any = process.env.JWT_EXPIRES_IN || "1d";

  public static async generateToken({ _id }: any) {
    // Generate token
    const token = jwt.sign({ _id }, Auth.JWT_SECRET_KEY, {
      expiresIn: Auth.JWT_EXPIRES_IN,
    });
    return token;
  }
  // @desc    Register user
  // @route   POST /api/v1/auth/register
  // @access  Public
  public static async register(req: Request, res: Response) {
    try {
      const user = await UserModel.create<UserDocument>(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
  // @desc    Login user
  // @route   POST /api/v1/auth/login
  // @access  Public
  public static async login(req: Request, res: Response) {
    try {
      const { email, password: unhashedPassword } = req.body;
      const user = await UserModel.findOne<UserDocument>({ email }).exec();
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not exist on the server" });
      }

      const isMatch = await user.isPasswordMatch(unhashedPassword);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      if (user.blocked) {
        return res.status(400).json({ message: "User is blocked" });
      }

      const token = await Auth.generateToken({ _id: user._id });
      const { password, ...userWithoutPassword } = user.toObject();
      const data = {
        user: userWithoutPassword,
        token,
      };
      return res.status(200).json({ user: data.user, token: data.token });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // @desc    Forgot Password
  // @route   POST /api/v1/auth/forgot-password
  // @access  Public
  public static async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await UserModel.findOne<UserDocument>({ email }).exec();
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not exist on the server" });
      }
      const resetToken = await user.getResetPasswordToken();
      const resetPasswordLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
      const message = emailTemplate(user, resetPasswordLink);
      const options: EMAIL_OPTIONS = {
        to: email,
        subject: "Reset Password Request",
        text: message,
      };
      await sendEmail(options);
      return res.status(200).json({
        message: `Email has been sent to ${email}. Follow the instruction to reset password your account`,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // @desc    Reset Password
  // @route   PUT /api/v1/auth/reset-password/:resetToken
  // @access  Public
  public static async resetPassword(req: Request, res: Response) {
    try {
      const { resetToken } = req.params;
      const { password } = req.body;
      const user = await UserModel.findOne<UserDocument>({
        resetPasswordToken: resetToken,
      }).exec();
      if (!user) {
        return res
          .status(404)
          .json({ message: "Token is not valid or not exist" });
      }
      if (user.resetPasswordExpire < Date.now()) {
        return res.status(400).json({ message: "Token is expired" });
      }

      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return res.status(200).json({
        message: `Password reset successfully`,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
