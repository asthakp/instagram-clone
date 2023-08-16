import mongoose, { Document } from "mongoose";

interface UserInterface extends Document {
  fullName: String;
  email: String;
  userName: String;
  jwt: String;
  password: String;
  followers: mongoose.Schema.Types.ObjectId;
  following: mongoose.Schema.Types.ObjectId;
  photo: String;
  stories: {
    user: mongoose.Schema.Types.ObjectId;
    storyPic: String;
    storyDate: Date;
  };
}
export default UserInterface;
