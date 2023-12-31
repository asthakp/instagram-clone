import express from "express";
import {
  loginUser,
  registerUser,
  getUserById,
  followUser,
  unfollowUser,
  uploadProfilePic,
  addStory,
  getStory,
  searchUser,
} from "../controllers/users.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = express.Router();

router.get("/getstory", authMiddleware as any, getStory);
router.post("/searchuser", authMiddleware as any, searchUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", authMiddleware as any, getUserById);
router.patch("/follow/:id", authMiddleware as any, followUser);
router.patch("/unfollow/:id", authMiddleware as any, unfollowUser);
router.patch("/profilepic", authMiddleware as any, uploadProfilePic);

router.post("/addstory", authMiddleware as any, addStory);

export default router;
