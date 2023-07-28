import { Request, Response, NextFunction } from "express";
import User from "../models/users.model";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  user: object;
}

export const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token: string = req.headers.authorization.split(" ")[1];
      const secretKey: string = process.env.JWT_SECRET_KEY ?? "";
      const validatedData: any = jwt.verify(token, secretKey);
      const user: any = await User.findOne({ email: validatedData.email });
      req.user = user;
      next();
    } else {
      return res.status(401).json({
        status: false,
        message: "Unauthorized user",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};
