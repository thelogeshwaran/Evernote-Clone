import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import { Divider , Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles"
import styles from "./Styles.js"
import SidebarItem from "../SidebarItem/SidebarItem"
import { useFirestore } from "../Firebase/Firebase";
import firebase from "firebase"
import { useNotes } from "../Context/NotesProvider.js";




function Sidebar({classes}){

    const { notes, setSelectNote } = useNotes();
    // console.log("notes")
    const [title , setTitle] = useState("");
    const [ addingNote , setAddingNote] = useState(false);
    
    useEffect(()=>{
        setSelectNote(notes[0])
    },[title])


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
        
    }

    return(
        <div
        className={ classes.sidebarContainer }>
        <Button className={ classes.newNoteBtn } onClick={ () => newNoteClick() }>{ addingNote ? "CANCEL" : "NEW NOTE" }</Button>
        {
            addingNote ? <div>
                <input className={ classes.newNoteInput } placeholder="Enter a new title" onKeyUp={ (e)=> setTitle(e.target.value) }></input>
                <Button  className={ classes.newNoteSubmitBtn } onClick={()=> newNoteSubmit()} disabled={ !title }>SUBMIT</Button>
            </div> 
            
            
            : null
  
        }
        <List>
            <div style={{display:"flex", justifyContent:"space-around"}}>
                <div>Title </div>
                <div>Tags</div>
            </div>
            {
                notes.map((note, index)=>{
                    return (
                        <div key={index}>
                            <SidebarItem note={note}>
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