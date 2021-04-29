import "./App.css"
import React from "react";
import './App.css';
import HomePage from "./HomePage";
import  Navigation  from "./Navigation/Navigation";
import { BrowserRouter , Route,Routes } from "react-router-dom";
import Editpage from "./Editpage";
import  TrashPage from "./TrashPage";
import Authentication  from "./Auth/Authentication";
import { useAuthProvider } from "./Context/AuthProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./LoginPage";




function App() {


   const { user } = useAuthProvider();

   console.log("app",user)
  return (
    <div className="app-container">
      
      {
        user === false  ?
        <BrowserRouter>
        
          <div > 
            <Routes>
              <Route path="/" exact ><Login/></Route>
            </Routes>
          </div>
        
       </BrowserRouter>
        
      :
      // <div>Logged in</div>
      <BrowserRouter>
        <div>
        <Navigation/>
        </div>
          <div > 
            <Routes>
              <Route path="/" exact ><HomePage/></Route>
              <Route path="/editor" ><Editpage/></Route>
              <Route path="/bin" ><TrashPage/></Route>
            </Routes>
          </div>
        
       </BrowserRouter>

       

      }
      
    </div>
  );
}

export default App;
