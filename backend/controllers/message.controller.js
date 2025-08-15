import { getReceiverSocketId,io } from "../socket/socket.js";
import Conversation from "./../models/conversation.js";
import Message from "./../models/message.js"
export const sendmessage  = async (req,res)=>{
    try{
        const {message} = req.body;
        const {id:receiverID}=req.params;
        const senderID = req.user._id; // we set req.user = user in protectedroute file
       
        if(!message?.trim()){
            return res.status(400).json({error: "Message not empty"});
        }

       let conversation =  await Conversation.findOne({
            participants:{ $all:[senderID,receiverID]},
        });

       if(!conversation){
       conversation = await Conversation.create({
            participants:[senderID,receiverID],
            // messages:[message], no need to set messages here it is default empty 
        })
    }

        const newmessage = await Message.create({
             message,
            senderID,
           receiverID,

        })

    //  if(newmessage){
        conversation.messages.push(newmessage._id);
        await conversation.save();
        // return res.status(200).json(newmessage);
    //  }
    
    	// SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = getReceiverSocketId(receiverID);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage",newmessage);
		}

    //  await newconversation.save(); 
    //  await newmessage.save();
    // await Promise.all([conversation.save(),newmessage.save()]); // this will run in parallel at the same time
    return res.status(200).json(newmessage); // sending data back to client v imp 
   
    }


    
    catch(error){
        console.log("Error in message sending");
    }
   
};

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
        res.status(200).json(messages);
    }
    catch(error){
        console.log("Error in getting messages",error.message);
        res.status(500).json({
            error:"Error in getting messages",
        })
    }
}
