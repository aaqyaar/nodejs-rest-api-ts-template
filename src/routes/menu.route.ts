import { Router } from "express";
import Menu from "../controllers/auth/menu";

const { create, list, readOne, removeOne, update } = Menu;

const router = Router();

// @desc    Create Permission Category @access  Private
// @route   POST /api/v1/menus
router.post("/menus", create);
// @desc    Get all Permission Category @access  Private
// @route   GET /api/v1/menus
router.get("/menus", list);
// @desc    Get Permission Category @access  Private
// @route   GET /api/v1/menus/:_id
router.get("/menus/:_id", readOne);
// @desc    Update Permission Category @access  Private
// @route   PUT /api/v1/menus
router.put("/menus", update);
// @desc    DELETE Permission Category @access  Private
// @route   DELETE /api/v1/menus:_id
router.delete("/menus/:_id", removeOne);
//
export default router;
