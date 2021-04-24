import "./App.css"
import React,{useEffect, useState} from "react";
import { useFirestore } from "./Firebase/Firebase";
import './App.css';
import Editor from "./Editor/Editor";
import Sidebar from "./Sidebar/Sidebar";

function App() {
  const [notes, setNotes]= useState([])
    const [ selectNote , setSelectNote ] = useState(null)


    useEffect(()=>{
        useFirestore
        .collection("notes")
        .orderBy("timeStamp","desc")
        .onSnapshot(snap=>{
            setNotes(snap.docs.map((doc)=>({

                id: doc.id,
                data: doc.data()

            }))
            )
        })
    },[])
    // console.log(notes)
    // console.log(selectNote)
    // console.log(selectNote)
    
   

  return (
    <div className="app-container" style={{height:"100vh"}}>
     <Sidebar notes={notes}  selectNote={selectNote} setSelectNote={setSelectNote} />
            {
                selectNote ? <Editor selectNote={selectNote}/> : null
            }       
    </div>
  );
}

export default App;
