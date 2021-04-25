import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { useNotes } from "./Context/NotesProvider";
import Editor from "./Editor/Editor"


export default function Editpage(){
    
    const { selectNote } = useNotes();
    return (
        <div>
            
            <Sidebar/>
            {
                selectNote && <Editor/>
            }
            
        </div>
    )
}