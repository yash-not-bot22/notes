import "./App.css";
import Navbar from "./components/navbar";
import Home from "./components/home";
import { useState } from "react";
import { Route, Routes, BrowserRouter} from "react-router-dom";
import Setnote from "./context/setnote";
import Cards from "./components/cards";
import Login from "./components/login";
import Signup from "./components/signup";





function App() {
  const[logged,setlogged]=useState(false);
  const loggedmode=()=>{
    if(localStorage.getItem('token')!=="")
    setlogged(true);
    else{
      setlogged(false);
    }
  }
  const [mode, setmode] = useState("light");
  const togglemode = () => {
    if (mode === "light") {
      setmode("dark");
      document.body.style.backgroundColor = "black";
    } else {
      setmode("light");
      document.body.style.backgroundColor = "white";
    }
   
  };
  return (
    <> 
       <>
        
      <BrowserRouter>
      <Setnote>
        <Navbar title="iNotebook" theme={mode} log={logged} logstatus={loggedmode} toggle={togglemode} />
        
        <Routes>
        
          <Route path="/" element={<Home logstatus={loggedmode} theme={mode}/>}/>
          <Route path="/login" element={<Login logstatus={loggedmode} theme={mode}/>}/>
          <Route path="/signup" element={<Signup logstatus={loggedmode} theme={mode}/>}/>
          
          
          
        </Routes>
        
        

        
        
        </Setnote>
      </BrowserRouter>
      
      </>
    </>
  );
}

export default App;
