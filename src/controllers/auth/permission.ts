import { Request, Response } from "express";
import PermissionModel from "../../models/permission.model";
import { PermissionDocument } from "../../types/permission.types";

// global variable for the schema
const schema = PermissionModel;

export default class Permission {
  // @desc    Create Permission @access  Private
  // @route   POST /api/v1/permissions
  static async create(req: Request, res: Response) {
    try {
      const result = await schema.create<PermissionDocument>(req.body);
      return res.json({
        data: result,
        message: "Permission Created Successfuly",
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const results = await schema.find<PermissionDocument>();
      return res.json({ data: results });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async readOne(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      const result = await schema.findById(_id);
      return res.json({ data: result });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const data: PermissionDocument = req.body;
      const {
        name,
        route,
        method,
        auth,
        description,
        _id,
      }: PermissionDocument = req.body;
      const result = await schema.findByIdAndUpdate<PermissionDocument>(
        { _id },
        { name, route, method, auth, description },
        {
          new: true,
        }
      );
      return res.json({
        data: result,
        message: "Permission Updated Successfuly",
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async removeOne(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      await schema.findByIdAndDelete(_id);
      return res.json({ message: "Permission Deleted Successfuly" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
