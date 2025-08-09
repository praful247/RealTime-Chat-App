import Searchinput from "./Searchinput";
import Conversations from "./Conversations.jsx";
function Sidebar() {
    return (
        <div>
            <Searchinput/>
            <div className="divider px-3"></div>
          <Conversations/>
            {/* <LogoutButton/>  */}
        </div>
    )
}

export default Sidebar;
