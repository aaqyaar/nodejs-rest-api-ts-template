import { Request, Response } from "express";
import MenuModel from "../../models/Menu";
import { MenuDocument } from "../../types/permission.types";

const schema = MenuModel;

export default class PermissionCategory {
  // @desc    Create Permission Category @access  Private
  // @route   POST /api/v1/permission-category
  static async create(req: Request, res: Response) {
    try {
      const result = await schema.create<MenuDocument>(req.body);
      return res.json({
        data: result,
        message: "Menu Created Successfuly",
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const results = await schema.find<MenuDocument>();
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
      const data: MenuDocument = req.body;
      const result = await schema.findByIdAndUpdate<MenuDocument>(
        { _id: data._id },
        { data },
        {
          new: true,
        }
      );
      return res.json({
        data: result,
        message: "Menu Updated Successfuly",
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async removeOne(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      await schema.findByIdAndDelete(_id);
      return res.json({ message: "Menu Deleted Successfuly" });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
