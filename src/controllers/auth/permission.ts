import { Request, Response } from "express";
import PermissionModel from "../../models/Permission.model";
import { PermissionDocument } from "../../types/permission.types";

export default class Permission {
  // @desc    Create Permission @access  Private
  // @route   POST /api/v1/permissions
  static async create(req: Request, res: Response) {
    try {
      const permission = await PermissionModel.create<PermissionDocument>(
        req.body
      );
      return res.json({
        data: permission,
        message: "Permission Created Successfuly",
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const permissions = await PermissionModel.find<PermissionDocument>();
      return res.json({ data: permissions });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async readOne(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      const permission = await PermissionModel.findById(_id);
      return res.json({ data: permission });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const data: PermissionDocument = req.body;
      const permission =
        await PermissionModel.findByIdAndUpdate<PermissionDocument>(
          { _id: data._id },
          { data },
          {
            new: true,
          }
        );
      return res.json({
        data: permission,
        message: "Permission Updated Successfuly",
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async removeOne(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      await PermissionModel.findByIdAndDelete(_id);
      return res.json({ message: "Permission Deleted Successfuly" });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
