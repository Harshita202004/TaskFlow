import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateAuthPayload } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.post("/register", validateAuthPayload, register);
router.post("/login", validateAuthPayload, login);
router.post("/logout", logout);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, validateAuthPayload, updateProfile);

export default router;
