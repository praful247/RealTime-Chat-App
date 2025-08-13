import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from "./../skeletons/MessageSkeletons.jsx";
import { useEffect, useRef } from "react";
function Messages() {
    const {Loading,messages} = useGetMessages();
    const lastmessageref = useRef();

    useEffect(()=> {
         lastmessageref.current?.scrollIntoView({behavior : "smooth"});
    })
    
    return (
        <div className="px-4 flex-1 overflow-auto">
            {!Loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastmessageref}>
						<Message message={message} />
					</div>
				))}
                
           {Loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}  
           {!Loading && messages.length === 0 && (// three means just three times show loading 
				<p className='text-center'>Send a message to start the conversation</p>
			)}
            
        </div>
    )
}
export default Messages
