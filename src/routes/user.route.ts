import { Router } from "express";
import { list, update, removeOne } from "../controllers/user";

const router = Router();

// @desc    Get all users @access  Private
// @route   GET /api/v1/users
router.get("/users", list);
// @desc    Update User @access  Private
// @route   PUT /api/v1/users
router.put("/users", update);
// @desc    DELETE User @access  Private
// @route   DELETE /api/v1/users:_id
router.delete("/users/:_id", removeOne);
//
export default router;
