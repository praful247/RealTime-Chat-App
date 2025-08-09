import Conversation from "./../models/conversation.js";
import Message from "./../models/message.js"
export const sendmessage  = async (req,res)=>{
    try{
        const {message} = req.body;
        const {id:receiverID}=req.params;
        const senderID = req.user._id; // we set req.user = user in protectedroute file

       const conversation =  await Conversation.findOne({
            participants:{ $all:[senderID,receiverID]},
        })
       if(!conversation){
       conversation = await Conversation.create({
            participants:[senderID,receiverID],
            // messages:[message], no need to set messages here it is default empty 
        })

        const newmessage = await Message.create({
             message,
            senderID,
           receiverID,

        })

     if(newmessage){
        conversation.messages.push(newmessage._id);
       
        res.status(200).json({
            message:"Message sent successfully",
              
        })
     }

    //  await newconversation.save(); 
    //  await newmessage.save();

     await Promise.all([conversation.save(),newmessage.save()]); // this will run in parallel at the same time
    }
}

    
    catch(error){
        console.log("Error in message sending");
    }
   
}

export const getmessages = async (req,res)=>{
    try{
        const {id:usertochatid}=req.params;
        const senderid = req.user._id;

        const conversation = await Conversation.findOne({
            participants:{ $all:[senderid,usertochatid]},
        }).populate("messages");// populate (in conversation it contains message id but in messages there is actual message so it link it)


        if(!conversation)
        {
            return res.status(200).json([])
        }

        const messages = conversation.messages;
    }
    catch(error){
        console.log("Error in getting messages",error.message);
        res.status(500).json({
            error:"Error in getting messages",
        })
    }
}
