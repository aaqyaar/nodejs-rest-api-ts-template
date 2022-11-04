import Auth from "../controllers/auth/auth";
import { Router } from "express";

const router = Router();

// @desc    Register user @access  Public
// @route   POST /api/v1/auth/register
router.post("/auth/register", Auth.register);
// @desc    Login user  @access  Public
// @route   POST /api/v1/auth/login
router.post("/auth/login", Auth.login);
// @desc    Forgot Password @access  Public
// @route   POST /api/v1/auth/forgot-password
router.post("/auth/forgot-password", Auth.forgotPassword);
// @desc   Reset Password @access Public
// @route   PUT /api/v1/auth/reset-password/:resetToken
router.put("/auth/reset-password/:resetToken", Auth.resetPassword);

export default router;
