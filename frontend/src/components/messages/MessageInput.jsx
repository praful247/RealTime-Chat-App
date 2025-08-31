import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import useSendMessages from "../../hooks/useSendMessages";


function MessageInput() {
     const [message,setmessage] = useState("");
      const {Loading,sendMessages} = useSendMessages();
   const handlesubmit = async(e) =>{
      e.preventDefault();  // this will helps in not reloading every time you send messages 
      if(!message) return;
      //ekse
      await sendMessages(message);//sending message
      setmessage("");
      }

    return (
       <form className="px-4 my-3" onSubmit={handlesubmit}>
         <div className="w-full relative">
            <input
             type="text" 
             className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-700 text-white"
             placeholder="Type a message...."
             value={message}
             onChange={(e) => setmessage(e.target.value)}
              />
            <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
            
           {Loading  ?<div className="loading loading-spinner"></div>: <IoMdSend />} </button>
         </div>
       </form>
    )
}

export default MessageInput;
