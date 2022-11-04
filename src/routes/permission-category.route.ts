import { Router } from "express";
import PermissionCategory from "../controllers/auth/menu";

const router = Router();

// @desc    Create Permission Category @access  Private
// @route   POST /api/v1/permission-category
router.post("/permission-category", PermissionCategory.create);
// @desc    Get all Permission Category @access  Private
// @route   GET /api/v1/permission-category
router.get("/permission-category", PermissionCategory.list);
// @desc    Get Permission Category @access  Private
// @route   GET /api/v1/permission-category/:_id
router.get("/permission-category/:_id", PermissionCategory.readOne);
// @desc    Update Permission Category @access  Private
// @route   PUT /api/v1/permission-category
router.put("/permission-category", PermissionCategory.update);
// @desc    DELETE Permission Category @access  Private
// @route   DELETE /api/v1/permission-category:_id
router.delete("/permission-category/:_id", PermissionCategory.removeOne);
//
export default router;
