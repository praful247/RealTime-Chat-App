import { SlLogout } from "react-icons/sl";
function Logout() {
    
    const handleGooglelogout = () =>{
        window.location.href = "/api/logout";
    }
     
    return (
        <div className="absolute bottom-4 p-2  ">
           <button onClick={handleGooglelogout}><SlLogout /></button>
         </div>
    )
}

export default Logout
