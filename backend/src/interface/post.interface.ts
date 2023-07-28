import mongoose, { Document } from "mongoose";

interface PostInterface extends Document {
  title: String;
  body: String;
  photo: String;
  postedBy: mongoose.Schema.Types.ObjectId;
}
export default PostInterface;
