import mongoose from "mongoose";

const postModel = mongoose.Schema({
  user: String,
  imgName: String,
  text: String,
  avatar: String,
  timestamp: String,
});
//posts place where save files
export default mongoose.model("posts", postModel);
