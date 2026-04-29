import mongoose from "mongoose";
const conversationschema  = mongoose.Schema({
    participants:[  // an array of all participants 
        {
           type:mongoose.Schema.Types.ObjectId,
           ref:'users',
        }
    ],
    messages:[
        {
             type:mongoose.Schema.Types.ObjectId,
             ref:'message',
           default:[],
        }
    ]
      // created at //uploaded at 
},{timestamps:true}) 

const conversation   = mongoose.model("conversation" , conversationschema);

export default conversation;