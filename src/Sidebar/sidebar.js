import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import { Divider , Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles"
import styles from "./Styles.js"
import SidebarItem from "../SidebarItem/SidebarItem"
import { useFirestore } from "../Firebase/Firebase";
import firebase from "firebase"
import { useNotes } from "../Context/NotesProvider";
import "../App.css";
import { useAuthProvider } from "../Context/AuthProvider";
import { BiFilterAlt } from "react-icons/bi";



function Sidebar({classes}){

    const { notes, setSelectNote, addingNote, setAddingNote} = useNotes();
    const { user } = useAuthProvider();
    const [newTitle , setNewTitle] = useState("");
    const [ newnote, setNewnote] = useState(false);
    // console.log(newnote)
    
    useEffect(()=>{
        if(newnote){
            setSelectNote(notes[0])
        }
    },[newTitle])


    function newNoteClick(){
        setAddingNote(!addingNote);
        setNewTitle("");
    }

    async function  newNoteSubmit(){
        await useFirestore
        .collection("notes")
        .add({
            userId : user.uid,
            title : newTitle,
            body : "",
            tag:"common",
            pinned : false,
            timeStamp : firebase.firestore.FieldValue.serverTimestamp()
        }
        )    
        setAddingNote(false);
        setNewnote(true);
        setNewTitle("");
        
        
    }
    // console.log(notes)
    return(
        <div
        className={ classes.sidebarContainer }>
            <div className={classes.sidebarHeading}>
                <div><h3>Notes</h3></div>
                <div className={classes.filter}><BiFilterAlt/></div>
            </div> 
            <Button className={ classes.newNoteBtn } onClick={ () => newNoteClick() }>{ addingNote ? "CANCEL" : "NEW NOTE" }</Button>
        {
            addingNote ? <div>
                <input className={ classes.newNoteInput } autoFocus={true} placeholder="Enter a new title" onKeyUp={ (e)=> setNewTitle(e.target.value) }></input>
                <Button  className={ classes.newNoteSubmitBtn } onClick={()=> newNoteSubmit()} disabled={ !newTitle }>SUBMIT</Button>
            </div> 
            
            
            : null
  
        }
        <div>
        <div className={classes.sidebarContent} >
                <div>Title </div>
                <div>Tags</div>
            </div>
        <List>
            
            {
               notes && notes.map((note, index)=>{
                    return (
                        <div key={index}>
                            <SidebarItem note={note}>
                            </SidebarItem>
                            <Divider></Divider>
                        </div>
                        
                    )
                   }
                )
            }
        </List>
        </div>
    </div>
    )
}



export default withStyles(styles)(Sidebar);