import { Request, Response } from "express";
import UserModel from "../models/User.model";
import { getPaginatedData } from "../utils/pagination";

// @desc    Update user @access  Private
// @route   PUT /api/v1/users
export const update = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await UserModel.findByIdAndUpdate(
      { _id: data._id },
      { data },
      {
        new: true,
      }
    );
    if (!user) {
      return res
        .status(404)
        .json({ message: "User can't be update because is'nt exist." });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
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
    const { data, numberOfPages, currentPage }: any = await getPaginatedData(
      UserModel,
      modelType,
      page,
      limit
    );
    return res.status(200).json({ data, numberOfPages, currentPage });
  } catch (error) {
    res.status(500).json(error);
  }
};

// @desc    Delete User @access  Private
// @route   DELETE /api/v1/users:_id
export const removeOne = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const user = await UserModel.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
