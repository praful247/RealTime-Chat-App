import { useEffect, useState } from "react";
import useConversation from "./../zustand/useConversations";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [Loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/messages/getmessages/${selectedConversation._id}`,{
					credentials:'include',
				});
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]); /// whenever this selectcon id changes this useeffect runs

	return { messages, Loading };
};
export default useGetMessages;