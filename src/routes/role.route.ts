import { Router } from "express";
import Role from "../controllers/auth/role";

const { create, list, readOne, removeOne, update } = Role;

const router = Router();

// @desc    Create Role @access  Private
// @route   POST /api/v1/roles
router.post("/roles", create);
// @desc    List All Roles @access  Private
// @route   GET /api/v1/roles
router.get("/roles", list);
// @desc    List Single Role @access  Private
// @route   GET /api/v1/roles/:_id
router.get("/roles/:_id", readOne);
// @desc    Update Role @access  Private
// @route   PUT /api/v1/roles
router.put("/roles", update);
// @desc    Delete Role @access  Private
// @route   DELETE /api/v1/roles/:_id
router.delete("/roles/:_id", removeOne);

export default router;
