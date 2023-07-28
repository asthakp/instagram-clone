import { Request, Response } from "express";
import Post from "../models/post.model";

export const createPost = async (req: any, res: Response) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(401).json({
        status: false,
        error: "please enter all fields",
      });
    } else {
      const newPost = new Post({
        title,
        body,
        postedBy: req.user._id,
      });

      await newPost.save();
      return res.status(201).json({
        status: true,
        message: "Post created successfully",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

export const getPost = async (req: any, res: Response) => {
  try {
    const posts = await Post.find({}).populate("postedBy", "_id userName");
    return res.status(200).json({
      status: true,
      data: posts,
      message: "post fetched successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

export const getPersonalPosts = async (req: any, res: Response) => {
  try {
    const userPosts = await Post.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "_id userName"
    );
    return res.status(200).json({
      status: true,
      data: userPosts,
      message: "post fetched successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};
