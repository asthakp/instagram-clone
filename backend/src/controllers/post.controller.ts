import { Request, Response } from "express";
import Post from "../models/post.model";
import User from "../models/users.model";

export const createPost = async (req: any, res: Response) => {
  try {
    const { title, body, photo } = req.body;
    if (!title || !body || !photo) {
      return res.status(401).json({
        status: false,
        error: "please enter all fields",
      });
    } else {
      const newPost = new Post({
        title,
        body,
        photo,
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
    const posts = await Post.find({})
      .populate("postedBy", "_id userName photo ")
      .populate("comments.postedBy", "_id userName")
      .sort({ createdAt: -1 });

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
      "_id userName "
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

export const getPostById = async (req: any, res: Response) => {
  try {
    const isPost = await Post.findById(req.params.id);
    if (!isPost) {
      return res.status(404).json({
        status: false,
        message: "no post found",
      });
    } else {
      res.status(200).json({
        status: true,
        data: isPost,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

export const likePost = async (req: any, res: Response) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { likes: req.user._id } },
      { new: true }
    ).exec();

    if (!result) {
      return res.status(400).json({
        status: false,
        message: "This post doesn't exist",
      });
    } else {
      res.status(200).json({
        status: true,
        data: result,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

export const commentPost = async (req: any, res: Response) => {
  try {
    const comment = {
      text: req.body.text,
      postedBy: req.user._id,
    };
    console.log(comment.text);
    const result = await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: comment } },
      { new: true }
    )
      .populate("comments.postedBy", "_id userName")
      .populate("postedBy", "userName _id")
      .exec();

    if (!result) {
      return res.status(400).json({
        status: false,
        message: "This post doesn't exist",
      });
    } else {
      res.status(200).json({
        status: true,
        data: result,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

export const unlikePost = async (req: any, res: Response) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).exec();

    if (!result) {
      return res.status(400).json({
        status: false,
        message: "This post doesn't exist",
      });
    } else {
      res.status(200).json({
        status: true,
        data: result,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

export const deletePost = async (req: any, res: Response) => {
  try {
    const isPost = await Post.findOne({ _id: req.params.postId });
    if (!isPost) {
      return res.status(400).json({
        status: false,
        message: "post doesnt exist",
      });
    }
    const deletedpost = await Post.findOneAndDelete({ _id: req.params.postId });
    res.status(200).json({
      status: true,
      message: "post deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};
