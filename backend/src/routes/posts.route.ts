import express from "express";
import {
  createPost,
  getPost,
  getPersonalPosts,
  likePost,
  unlikePost,
  commentPost,
  deletePost,
  getPostById,
} from "../controllers/post.controller";

const router = express.Router();

router.post("/", createPost);
router.get("/", getPost);
router.get("/myposts", getPersonalPosts);
router.get("/:id", getPostById);
router.patch("/like/:id", likePost);
router.patch("/unlike/:id", unlikePost);
router.patch("/comment/:id", commentPost);
router.delete("/:postId", deletePost);

export default router;
