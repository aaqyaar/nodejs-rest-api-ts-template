import { Request, Response } from "express";
import RoleModel from "../../models/Role.model";

const schema = RoleModel;

export default class Role {
  // @desc    Create Permission Category @access  Private
  // @route   POST /api/v1/permission-category
  static async create(req: Request, res: Response) {
    try {
      const result = await schema.create(req.body);
      return res.json({
        data: result,
        message: "Role Created Successfuly",
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const results = await schema.find().populate("permission menu").exec();
      return res.json({ data: results });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async readOne(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      const result = await schema
        .findById(_id)
        .populate("permission menu")
        .exec();
      return res.json({ data: result });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const data = req.body;
      const result = await schema.findByIdAndUpdate(
        { _id: data._id },
        { data },
        {
          new: true,
        }
      );
      return res.json({
        data: result,
        message: "Role Updated Successfuly",
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async removeOne(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      await schema.findByIdAndDelete(_id);
      return res.json({ message: "Role Deleted Successfuly" });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
