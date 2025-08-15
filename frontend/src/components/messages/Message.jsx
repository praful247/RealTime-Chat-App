import { useState } from "react";
import useConversation from "../../zustand/useConversations";
import useCurrentUser from "../../hooks/useCurrentUser";
import { extractTime } from "../../../utils/extractTime.js";

function Message({message}) {
  const {selectedConversation} = useConversation();
  const { currentUser} = useCurrentUser();
  const formattedTime = extractTime(message.createdAt);
  const shakeClass = message.shouldShake ? "shake" : "";
  const fromme = String(message.senderID) == String(currentUser?._id);
  const chatclassname =  fromme ? 'chat-end' : 'chat-start' ;
  const bubblebgcolor = fromme ? 'bg-blue-500' : "";
  const name = fromme ? currentUser?.name : selectedConversation.name;
  
  // if(loading || currentUser){
  //   return <div className="animate-pulse" >Loading.....</div>
  // }

  const myFallback = currentUser?.name? `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}` : undefined;
  const otherFallback = selectedConversation?.name? `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedConversation.name)}` : undefined;
   
   const profilePic = fromme ? ( myFallback) : ( otherFallback);
  
    return (

  <div className={`chat ${chatclassname}`}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="bdb"
        src={profilePic}
      />
    </div>
  </div>
  <div className={`chat-bubble text-white ${bubblebgcolor} ${shakeClass} pb-2`}>{message.message}</div>
	<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
</div>


    )
}

export default Message;
