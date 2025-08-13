import { useState } from "react";
import useConversation from "../../zustand/useConversations";
import useCurrentUser from "../../hooks/useCurrentUser";
import { extractTime } from "../../../utils/extractTime.js";

function Message({message}) {
  const {selectedConversation} = useConversation();
  const {currentuser} = useCurrentUser();
  const formattedTime = extractTime(message.createdAt);
  const shakeClass = message.shouldShake ? "shake" : "";
  const fromme = message.senderID ==currentuser?._id;
  const chatclassname =  fromme ? 'chat-start' : 'chat-end';
  const profilePic = fromme ?currentuser.profilePic: selectedConversation.profilePic;
  const bubblebgcolor = fromme ? 'bg-blue-500' : "";
  const name = fromme ? currentuser.name : selectedConversation.name;
  
   
  
    return (

  <div className={`chat ${chatclassname}`}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
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
