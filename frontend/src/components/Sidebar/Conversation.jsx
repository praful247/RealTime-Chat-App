import React from 'react'
import useConversation from '../../zustand/useConversations.jsx';

const Conversation = ({conversation,lastidx,emoji}) => {
  const { selectedConversation,setSelectedConversation} = useConversation();

  const isselected  = selectedConversation?._id === conversation._id;
  return (
    <>
    <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isselected?"bg-sky-500":""}`} onClick={() => setSelectedConversation(conversation)}>
      <div className="avatar avatar-online">
  <div className="w-12 rounded-full">
    <img src={conversation.profilePic} alt="Profile pic"/>
  </div>
</div>
{/* <div className="avatar avatar-offline">
  <div className="w-24 rounded-full">
    <img src="https://img.daisyui.com/images/profile/demo/idiotsandwich@192.webp" />
  </div>
</div> */}
       <div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.name}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
       {lastidx &&  <div className='divider px-3  py-0 h-1' /> }
        {/* <div  className="divider px-3"></div> */}
    </div>
    </>
  )
}

export default Conversation;
