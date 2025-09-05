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
   name:
  {
     type:String,
    required:true,
  },
  profilePic:{
    type:String,
    default:function(){
       return `https://ui-avatars.com/api/?name=${this.name.split(" ").join("+")}`;
  },
  
},
  email:String,
  gender:{
     type:String,
    required:false,
  },
},{timestamps:true});

export default mongoose.model("users", userSchema);
