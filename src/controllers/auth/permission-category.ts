import { Request, Response } from "express";
import PermissionCategoryModel from "../../models/PermissionCategory.model";
import { PermissionCategoryDocument } from "../../types/permission.types";

const schema = PermissionCategoryModel;

export default class PermissionCategory {
  // @desc    Create Permission Category @access  Private
  // @route   POST /api/v1/permission-category
  static async create(req: Request, res: Response) {
    try {
      const result = await schema.create<PermissionCategoryDocument>(req.body);
      return res.json({
        data: result,
        message: "Permission Category Created Successfuly",
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const results = await schema.find<PermissionCategoryDocument>();
      return res.json({ data: results });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async readOne(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      const result = await schema.findById(_id);
      return res.json({ data: result });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const data: PermissionCategoryDocument = req.body;
      const result = await schema.findByIdAndUpdate<PermissionCategoryDocument>(
        { _id: data._id },
        { data },
        {
          new: true,
        }
      );
      return res.json({
        data: result,
        message: "Permission Category Updated Successfuly",
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async removeOne(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      await schema.findByIdAndDelete(_id);
      return res.json({ message: "Permission Category Deleted Successfuly" });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
