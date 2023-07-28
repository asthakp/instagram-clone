import multer from "multer";

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "./public/uploads");
  },
  filename: (req: any, file: any, cb: any) => {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/mpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images and videos are allowed."));
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 30 * 1024 * 1024,
  },
  fileFilter,
});
