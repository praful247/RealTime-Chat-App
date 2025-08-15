
import { createContext, useEffect, useState,useContext } from "react";
import {io} from "socket.io-client";
import useCurrentUser from "../src/hooks/useCurrentUser";

export const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};


export const SocketContextprovider = ({children}) => {
    const [socket,setSocket] = useState(null);
    const [onlineuser,setonlineuser] = useState([]);
    const { currentUser } = useCurrentUser();
    useEffect(() => {
        if(!currentUser?._id) return;
        const newSocket = io("http://localhost:8000",{
            query:{
                userId: currentUser._id
            }
        })
        setSocket(newSocket);
        
        newSocket.on("getOnlineUsers" ,(users) => {
            setonlineuser(users);
        })

       return () => { newSocket.close(); setSocket(null); };
    } ,[currentUser?._id])
    return (
        <SocketContext.Provider value={{socket,onlineuser}}>
            {children}

        </SocketContext.Provider>
    )
}