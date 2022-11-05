import { Router } from "express";
import Menu from "../controllers/auth/menu";
import { isAuth } from "../middlewares/auth";

const { create, list, readOne, removeOne, update } = Menu;

const router = Router();

// @desc    Create MENUS @access  Private
// @route   POST /api/v1/menus
router.post("/menus", create);
// @desc    Get all MENUS @access  Private
// @route   GET /api/v1/menus
router.get("/menus", list);
// @desc    Get MENUS @access  Private
// @route   GET /api/v1/menus/:_id
router.get("/menus/:_id", readOne);
// @desc    Update MENUS @access  Private
// @route   PUT /api/v1/menus
router.put("/menus", isAuth, update);
// @desc    DELETE MENUS @access  Private
// @route   DELETE /api/v1/menus:_id
router.delete("/menus/:_id", removeOne);
//
export default router;
