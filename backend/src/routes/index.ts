import express from "express";
import userRouter from "./users.routes";
import postRouter from "../routes/posts.route";

import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.use("/users", userRouter);
router.use("/posts", authMiddleware as any, postRouter);

export default router;
