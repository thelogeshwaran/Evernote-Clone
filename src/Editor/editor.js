import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import {useFirestore} from "../firebase/firebase"


function Editor({classes, selectNote}){

    const [ text, setText ] = useState("");
    const [title , setTitle] = useState("")

    useEffect(()=>{
        // console.log(selectNote.data.body)
        setTitle(selectNote.data.title)
         setText(selectNote.data.body) 
    },[selectNote])


    useEffect(()=>{
        console.log("timeout")
        const timeout = setTimeout(()=>{    
            if(text){
                console.log("timeout")
                useFirestore
                .collection("notes")
                .doc(selectNote.id)
                .update({
                     body : text,
                     title : title
                })
                
            }
        },1500)

        return ()=>{
            clearTimeout(timeout)
        }

    },[text,title])
   
    
    return (
        <div className={classes.editorContainer}>
            <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
                <input className={classes.titleInput} placeholder="Note Title" value ={title}  onChange={(e)=> setTitle(e.target.value)}>
                </input>
            
            <ReactQuill value={text} onChange={(val)=> setText(val)}>
            </ReactQuill>
        </div>
    )
}




export default withStyles(styles)(Editor);