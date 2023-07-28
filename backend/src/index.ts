import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { dbConnection } from "./config/db.config";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import indexRouter from "./routes/index";
import cors from "cors";
// import xss from 'xss'

const app = express();
dbConnection();

app.use(cors());

app.use(morgan("tiny"));
//to receive req from postman
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//security
app.use(mongoSanitize());
app.use(helmet()); //set security headers
// app.use(xss()); //prevent cross side scripting
app.use(hpp()); //prevent html parameter pollution

app.use("/", indexRouter);

interface CustomError extends Error {
  status?: number;
}
//error handling for unmatched routes
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: CustomError = new Error("page not found");
  error.status = 404;
  next(error);
});
//error handler middleware
app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).json({
      status: false,
      error: error.message,
    });
  }
);

const PORT = process.env.PORT || 8085;

app.listen(PORT, () => {
  console.log("server is running at port", PORT);
});
