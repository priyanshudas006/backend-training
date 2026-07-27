import { Router } from "express";
import {
  register,
  login,
  getProfile,
} from "../controllers/auth.controller";
import verifyToken from "../middleware/verifyToken";

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post("/login", login);

/**
 * @route   GET /api/auth/me
 * @desc    Get logged-in user profile
 * @access  Private
 */
router.get("/me", verifyToken, getProfile);

export default router;