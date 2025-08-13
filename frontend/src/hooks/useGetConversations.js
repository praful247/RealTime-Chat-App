import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
// import conversation from '../../../backend/models/conversation';

const useGetConversations = () => {
   const [Loading ,setLoading] = useState(false);
   const [conversations,setconversations] = useState([]);
   useEffect(()=>{
    const getconversations = async () =>{
        setLoading(true);
        try{
             const res = await fetch('/api/users')
             const data  = await res.json();
             if(data.error)
             {
                throw new Error(data.error);
             }
             setconversations(data);
        }
        catch(error){ 
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }
    getconversations();

   },[]);
   
return {Loading,conversations};
}

export default useGetConversations
