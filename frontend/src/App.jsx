import {Route,Routes} from "react-router-dom";
import Login from "./pages/login or signup/login.jsx"
import './App.css'
import Home from "./pages/Home/home.jsx"
import Messagecontainer from "./components/messages/messagecontainer.jsx"
function App() {

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
        {/* <Login/> */}
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        </Routes>
        
     
    </div> 
  )
}

export default App;
