import Searchinput from "./Searchinput";
import Conversations from "./Conversations.jsx";
import Logout from "./Logout.jsx";
function Sidebar() {
    return (
        <div className="relative">
            <Searchinput/>
            <div className="divider px-3"></div>
          <Conversations/>
            <Logout/> 
        </div>
    )
}

export default Sidebar;
