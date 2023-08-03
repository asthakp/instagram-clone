import express from "express";
import {
  loginUser,
  registerUser,
  getUserById,
} from "../controllers/users.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", authMiddleware as any, getUserById);

export default router;
