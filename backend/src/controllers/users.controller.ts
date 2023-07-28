import { Request, Response } from "express";
import User from "../models/users.model";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, userName, fullName, password } = req.body;
    const isUser = await User.findOne({ $or: [{ email }, { userName }] });
    console.log(isUser);
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
    if (!userName) {
      return res.status(401).json({
        status: false,
        message: "invalid username or password",
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
          data: updatedUser.jwt,
        });
      } else {
        return res.status(401).json({
          status: false,
          message: "Invalid user or password",
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
