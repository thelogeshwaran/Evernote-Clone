import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import { Divider , Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles"
import styles from "./styles.js"
import SidebarItem from "../SidebarItem/sidebarItem"
import { useFirestore } from "../firebase/firebase";
import firebase from "firebase"




function Sidebar({classes , notes, selectNote , setSelectNote}){

    const [title , setTitle] = useState("");
    const [ addingNote , setAddingNote] = useState(false);
    const [ notesAdded , setNotesAdded] = useState(null)
    
    useEffect(()=>{
      
        setSelectNote(notes[0])
    },[notesAdded])


    function newNoteClick(){
        setAddingNote(!addingNote);
        setTitle("");
    }

    async function  newNoteSubmit(){

        
        await useFirestore
        .collection("notes")
        .add({
            title : title,
            body : "",
            timeStamp : firebase.firestore.FieldValue.serverTimestamp()
        }

        )
        setAddingNote(!addingNote);
        setTitle("");
        setNotesAdded(!notesAdded)
        
    }

    return(
        <div
        className={classes.sidebarContainer}>
        <Button className={classes.newNoteBtn} onClick={ () => newNoteClick()}>{addingNote ? "CANCEL" : "NEW NOTE"}</Button>
        {
            addingNote ? <div>
                <input className={ classes.newNoteInput} placeholder="Enter a new title" onKeyUp={ (e)=> setTitle(e.target.value)}></input>
                <Button  className={classes.newNoteSubmitBtn} onClick={()=> newNoteSubmit()} disabled={ !title}>SUBMIT</Button>
            </div> 
            
            
            : null
  
        }
        <List>
            {
                notes.map((note, index)=>{
                    return (
                        <div key={index}>
                            <SidebarItem note={note} selectNote= {selectNote} setSelectNote={setSelectNote}>
                        </SidebarItem>
                        <Divider></Divider>
                        </div>
                        
                    )
                })
            }
        </List>
        </div>
    )
}



export default withStyles(styles)(Sidebar);