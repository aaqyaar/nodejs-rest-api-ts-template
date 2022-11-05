import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { UserDocument } from "../types/user.types";
import { getReferecedPaginatedData } from "../utils/pagination";

// @desc    Update user @access  Private
// @route   PUT /api/v1/users
export const update = async (req: Request, res: Response) => {
  try {
    const { _id, name, email, avatar, role, blocked, confirmed }: UserDocument =
      req.body;
    const result = await UserModel.findByIdAndUpdate(
      { _id },
      { name, email, avatar, role, blocked, confirmed },
      {
        new: true,
      }
    );
    if (!result) {
      return res
        .status(404)
        .json({ message: "User can't be update because is'nt exist." });
    }
    return res
      .status(200)
      .json({ data: result, message: "User Updated Successfuly" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc    Get all users @access  Private
// @route   GET /api/v1/users
export const list = async (req: Request, res: Response) => {
  try {
    const q: any = req.query && req.query;
    const page = q.page && q.page > 0 ? parseInt(q.page) : 0;
    const limit = q.limit && q.limit > 0 ? parseInt(q.limit) : 10;
    const modelType = "User";
    const { data, numberOfPages, currentPage }: any =
      await getReferecedPaginatedData(
        UserModel,
        modelType,
        "role",
        page,
        limit
      );
    return res.status(200).json({ data, numberOfPages, currentPage });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc    Delete User @access  Private
// @route   DELETE /api/v1/users:_id
export const removeOne = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    await UserModel.findByIdAndDelete(_id);
    return res.status(200).json({ message: "User Deleted Successfuly" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
