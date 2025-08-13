import {create } from 'zustand';
// import message from '../../../backend/models/message';

const useConversation = create((set) =>({
    selectedConversation:null,
    setSelectedConversation:(selectedConversation) => set({selectedConversation}),
    messages:[],
    setMessages:(messages) => set({messages}),
}))

export default useConversation;