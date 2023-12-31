import { Request, Response } from "express";
import User from "../models/users.model";
import jwt from "jsonwebtoken";
import Post from "../models/post.model";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, userName, fullName, password } = req.body;
    const isUser = await User.findOne({ $or: [{ email }, { userName }] });

    if (isUser) {
      return res.status(401).json({
        status: false,
        message: "User already exists",
      });
    } else {
      const newUser = new User({
        email,
        userName,
        fullName,
        password,
      });
      await newUser.save();
      return res.status(201).json({
        status: true,
        message: "user created successfully",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const isUser: any = await User.findOne({ userName });
    if (!isUser) {
      return res.status(401).json({
        status: false,
        error: "invalid username or password",
      });
    } else {
      const matchPass = await isUser.matchPassword(password);

      if (matchPass) {
        const secretKey: string = process.env.JWT_SECRET_KEY ?? "";
        const token = jwt.sign({ email: isUser.email }, secretKey, {
          expiresIn: "3d",
        });

        const updatedUser: any = await User.findOneAndUpdate(
          {
            _id: isUser._id,
          },
          {
            $set: {
              jwt: token,
            },
          },
          {
            new: true,
          }
        );

        return res.status(200).json({
          status: true,
          message: "User logged in successfully",
          data: updatedUser,
        });
      } else {
        return res.status(401).json({
          status: false,
          error: "Invalid user or password",
        });
      }
    }
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

export const getUserById = async (req: any, res: Response) => {
  try {
    // avoid sending pw to fe
    const isUser = await User.findById(req.params.id).select("-password");
    if (!isUser) {
      return res.status(404).json({
        status: false,
        message: "user doesnt exist",
      });
    } else {
      const posts = await Post.find({ postedBy: isUser._id }).populate(
        "postedBy",
        "_id userName"
      );
      return res.status(200).json({
        status: true,
        data: {
          user: isUser,
          posts,
        },
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

export const followUser = async (req: any, res: Response) => {
  try {
    const isUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { followers: req.user._id } },
      { new: true }
    );
    console.log(isUser);
    if (!isUser) {
      return res.status(422).json({
        status: false,
        message: "user not found",
      });
    }
    const loggedUser = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $push: { following: req.params.id } },
      { new: true }
    );
    res.status(200).json({
      status: true,
      data: {
        followedUser: isUser,
        followedByUser: loggedUser,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

export const unfollowUser = async (req: any, res: Response) => {
  try {
    const isUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { followers: req.user._id } },
      { new: true }
    );
    if (!isUser) {
      return res.status(422).json({
        status: false,
        message: "user not found",
      });
    }
    const loggedUser = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $pull: { following: req.params.id } },
      { new: true }
    );
    res.status(200).json({
      status: true,
      data: {
        unfollowedUser: isUser,
        unfollowedByUser: loggedUser,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

export const uploadProfilePic = async (req: any, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          photo: req.body.pic,
        },
      },
      { new: true }
    );
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      status: true,
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

export const addStory = async (req: any, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          stories: {
            user: req.user._id,
            storyPic: req.body.image,
            storyDate: new Date(),
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      status: true,
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

export const getStory = async (req: any, res: Response) => {
  try {
    const userStories = await User.find({
      "stories.storyDate": {
        $lte: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      },
    }).select("_id userName photo stories");

    // less than 24 hrs
    return res.status(200).json({
      status: true,
      userStories,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: error,
    });
  }
};

export const searchUser = async (req: any, res: Response) => {
  try {
    const searchPattern = new RegExp("^" + req.body.query.toLowerCase()); //^n: gives string starting with n
    const user = await User.find({
      userName: { $regex: searchPattern },
    }).select("_id userName photo");
    return res.status(200).json({
      status: true,
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};
