import mongoose from "mongoose";

const mongooseschema  = new mongoose.Schema({
  senderID:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref:"users", // id from user model 
    required:true
  },
  receiverID:{
       type: mongoose.Schema.Types.ObjectId,
       ref:"users", // id from user model 
       required:true,
  },
  message:{
    type:String,
    required:true,
  }
},{timestamps:true});

const message = mongoose.model("message" , mongooseschema);

export default message;

