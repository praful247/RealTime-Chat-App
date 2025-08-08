import User from "../models/Users.js";
export const getUserforsidebar = async(req,res) => {
    try {
         const loggedInUserId = req.user._id;

         const allUsers = await User.find({_id : {$ne : loggedInUserId}}).select("-password");  // ne  = not equal to bcoz we do not want to see ourself on sidebar
         res.status(200).json(allUsers);
    } catch (error) {
        console.error("Error in  getUserforsidebar: ",error.message)
        res.status(500).json({error : "Internal server error"});
    }
}