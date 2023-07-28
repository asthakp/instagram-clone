import mongoose from "mongoose";

export const dbConnection = async () => {
  const MONGO_URI: string = process.env.MONGO_URI || "";
  const connection = await mongoose.connect(MONGO_URI);
  console.log("mongodb connected at", connection.connection.host);
};
