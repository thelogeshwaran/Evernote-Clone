import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { useNotes } from "./Context/NotesProvider";
import Editor from "./Editor/Editor";
import "./App.css"


export default function Editpage(){
    
    const { selectNote } = useNotes();
    return (
        
            <div className="content">
            <Sidebar/>
            {
                selectNote && <Editor/>
            }
            </div>
            
    )
}