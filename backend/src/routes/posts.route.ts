import express from "express";
import {
  createPost,
  getPost,
  getPersonalPosts,
} from "../controllers/post.controller";

const router = express.Router();

router.post("/", createPost);
router.get("/", getPost);
router.get("/myposts", getPersonalPosts);

export default router;
