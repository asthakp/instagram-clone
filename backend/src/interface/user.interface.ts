import { Document } from "mongoose";

interface UserInterface extends Document {
  fullName: String;
  email: String;
  userName: String;
  jwt: String;
  password: String;
}
export default UserInterface;
