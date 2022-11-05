import { Request, Response } from "express";
import MenuModel from "../../models/menu.model";
import { MenuDocument } from "../../types/permission.types";

const schema = MenuModel;

export default class Menu {
  // @desc    Create Permission Category @access  Private
  // @route   POST /api/v1/permission-category
  static async create(req: Request, res: Response) {
    try {
      const result = await schema.create<MenuDocument>(req.body);
      return res.json({
        data: result,
        message: "Menu Created Successfuly",
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const results = await schema.find<MenuDocument>();
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
      const { path, _id, menu, type, subMenu }: MenuDocument = req.body;
      const result = await schema.findByIdAndUpdate<MenuDocument>(
        { _id },
        { path, menu, type, subMenu },
        {
          new: true,
        }
      );
      return res.json({
        data: result,
        message: "Menu Updated Successfuly",
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async removeOne(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      await schema.findByIdAndDelete(_id);
      return res.json({ message: "Menu Deleted Successfuly" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
