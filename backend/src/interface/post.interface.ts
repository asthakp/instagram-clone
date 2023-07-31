import mongoose, { Document } from "mongoose";

interface PostInterface extends Document {
  title: String;
  body: String;
  photo: String;
  postedBy: mongoose.Schema.Types.ObjectId;
  likes: mongoose.Schema.Types.ObjectId;
  comments: {
    text: String;
    postedBy: mongoose.Schema.Types.ObjectId;
  };
}
export default PostInterface;
