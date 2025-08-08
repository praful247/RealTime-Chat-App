import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleID:{
    type:String,
    required:true,
  },
  username:{
    type:String,
    required:true,
  },
  name:String,
  email:String,
  gender:String,
},{timestamps:true});

export default mongoose.model("users", userSchema);
