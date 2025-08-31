//  import { useState } from "react";   
function Login() {
    
    const handleGoogleLogin = () =>{
        window.location.href = "/auth/google";
    }
     
    return (
       <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
          <div className="h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 border border-gray-100">
                     <h1 className="text-3xl font-semibold text-center  text-gray-300">Login

                        <span className="text-blue-500"> ChatApp </span>
                        </h1>
      
            <div>
                <button className="btn btn-block btn-sm mt-2" onClick={handleGoogleLogin}>Login With Google</button>
            </div>
</div>
</div>

    )
}

export default Login;
