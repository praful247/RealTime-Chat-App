import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversations';

const useSendMessages = () => {
   const [Loading,setLoading] = useState(false);
   const {messages,setMessages,selectedConversation} = useConversation();

   const sendMessages = async(message)=>{
          setLoading(true);
          try{
      const res = await fetch(`/messages/send/${selectedConversation._id}`,{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        credentials:'include', // Add this line to send cookies
        body:JSON.stringify({message})
      })
      const data = await res.json();
      if(data.error) throw new Error(data.error);
      	setMessages([...messages, data]);
          }
   
   catch(error){
       toast.error(error.message);
   }
   finally{
      setLoading(false)
   }
};
return {Loading ,sendMessages};
};

export default useSendMessages
