import React, { useEffect } from "react";
import CardContent from '@material-ui/core/CardContent';
import { useNotes } from "./Context/NotesProvider";
import "./index.css";
import { removeHTMLTags } from "./helpers";
import NoteAddIcon from '@material-ui/icons/NoteAdd';

function HomePage() {

    const { notes } = useNotes();
    console.log(notes)
    // useEffect(()=>{
    //     console.log("one")
    // },[notes])
    

    return (
        <div className="notes">
            <div>
                <h1>Notes</h1>
            </div>
            
            <div className="cards">
                {
                    notes.map((item)=>{
                        return (
                            <div className="card">
                                <CardContent style={{ height:"280px", width:"180px"}}>
                                    <h2>{item.data.title}</h2>
                                    <p>{removeHTMLTags(item.data.body.substring(0,170)+"...")}</p>
                                    </CardContent>
                            </div>
                            
                        )
                    })
                }
                <div className="card">
                    <CardContent  style={{ height:"280px", width:"180px",display:"flex", justifyContent:"center", alignItems:"center"}}>
                        <NoteAddIcon style={{ color : "green"}}/>
                    </CardContent>
                </div>
                

            </div>
        </div>
    )
}



export default HomePage;
