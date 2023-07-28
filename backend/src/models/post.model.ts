import mongoose from "mongoose";
import PostInterface from "./../interface/post.interface";

const postSchema = new mongoose.Schema<PostInterface>({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "no photo",
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model<PostInterface>("Post", postSchema);

export default Post;
