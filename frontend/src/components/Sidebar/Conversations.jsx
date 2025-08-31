import { getRandomEmoji } from "../../../utils/emoji.js";
import useGetConversations from "../../hooks/useGetConversations.js";
import Conversation from "./Conversation.jsx"

const Conversations = () => {
const {Loading,conversations} =useGetConversations();
console.log(conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto relative">
      {conversations.map((conversation,idx) => (
        <Conversation 
        key={conversation._id}  // unique key
        conversation={conversation}
        emoji={getRandomEmoji()}
        lastidx={idx === conversations.length-1}
        />
      ))}
      {Loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  )
}

export default Conversations
