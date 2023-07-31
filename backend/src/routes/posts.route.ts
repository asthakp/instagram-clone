import express from "express";
import {
  createPost,
  getPost,
  getPersonalPosts,
  likePost,
  unlikePost,
  commentPost,
} from "../controllers/post.controller";

const router = express.Router();

router.post("/", createPost);
router.get("/", getPost);
router.get("/myposts", getPersonalPosts);
router.patch("/like/:id", likePost);
router.patch("/unlike/:id", unlikePost);
router.patch("/comment/:id", commentPost);

export default router;
