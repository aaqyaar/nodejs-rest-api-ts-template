import { Router } from "express";
import Permission from "../controllers/auth/permission";

const router = Router();
// @desc    Create Permission @access  Private
// @route   POST /api/v1/permissions
router.post("/permissions", Permission.create);
// @desc    Update Permission @access  Private
// @route   PUT /api/v1/permissions
router.put("/permissions", Permission.update);
// @desc    List All Permissions @access  Private
// @route   GET /api/v1/permissions
router.get("/permissions", Permission.list);
// @desc    List Single Permission @access  Private
// @route   DELETE /api/v1/permissions/:_id
router.delete("/permissions/:_id", Permission.removeOne);

export default router;
