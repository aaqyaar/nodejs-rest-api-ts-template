import { Router } from "express";
import Permission from "../controllers/auth/permission";

const { create, update, list, removeOne } = Permission;

const router = Router();
// @desc    Create Permission @access  Private
// @route   POST /api/v1/permissions
router.post("/permissions", create);
// @desc    Update Permission @access  Private
// @route   PUT /api/v1/permissions
router.put("/permissions", update);
// @desc    List All Permissions @access  Private
// @route   GET /api/v1/permissions
router.get("/permissions", list);
// @desc    List Single Permission @access  Private
// @route   DELETE /api/v1/permissions/:_id
router.delete("/permissions/:_id", removeOne);

export default router;
