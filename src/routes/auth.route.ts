import Auth from "../controllers/auth/auth";
import { Router } from "express";

const { login, register, forgotPassword, resetPassword } = Auth;

const router = Router();

// @desc    Register user @access  Public
// @route   POST /api/v1/auth/register
router.post("/auth/register", register);
// @desc    Login user  @access  Public
// @route   POST /api/v1/auth/login
router.post("/auth/login", login);
// @desc    Forgot Password @access  Public
// @route   POST /api/v1/auth/forgot-password
router.post("/auth/forgot-password", forgotPassword);
// @desc   Reset Password @access Public
// @route   PUT /api/v1/auth/reset-password/:resetToken
router.put("/auth/reset-password/:resetToken", resetPassword);

export default router;
