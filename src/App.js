import "./App.css"
import React,{useEffect, useState} from "react";
import './App.css';
import HomePage from "./HomePage";
import { useNotes } from "./Context/NotesProvider";
import  Navigation  from "./Navigation/Navigation";
import { BrowserRouter , Route } from "react-router-dom";
import  Sidebar from "./Sidebar/Sidebar";
import Editpage from "./Editpage";

function App() {

  const { selectNote } = useNotes();
   

  return (
    <div className="app-container">
      {/* <BrowserRouter>
       <div>
            <div className="navigation">
              <Navigation/>
            </div>
            <div className="content">
              <Route path="/" exact ><HomePage  /></Route>
              <Route path="/editor"><Editpage /></Route>     
              <HomePage/>
              <Sidebar/>
              {
                selectNote && <Editpage/>
              }

              </div>
      </div>
      </BrowserRouter> */}
       <div className="navigation">
       <Navigation/>
       </div>
       <div className="content">
       <HomePage/>
       
      </div>
    </div>
  );
}

export default App;
