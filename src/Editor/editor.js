import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import {useFirestore} from "../Firebase/Firebase";
import { useNotes } from "../Context/NotesProvider";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import "../App.css"


function Editor({classes}){

    const { selectNote } = useNotes();
    const [ text, setText ] = useState("");
    const [title , setTitle] = useState("")

    useEffect(()=>{
        console.log(selectNote.data.body)
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

   const modules = {
        toolbar: [
          [{ 'header': [1, 2,3,4,5,6, false] }],
          [{ 'font': [] }],
          ['bold', 'italic', 'underline','strike', 'blockquote','code-block'],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          [{ 'color': [] }, { 'background': [] }],
          ['clean'],
          
        ],
      }


    
    return (
        <div className={classes.editorContainer}>
            <div className="title-editor">
            <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
                <input className={classes.titleInput} placeholder="Note Title" value ={title}  onChange={(e)=> setTitle(e.target.value)}>
                </input>
            </div>
                
            
            <ReactQuill value={text} onChange={(val)=> setText(val)} modules={modules}>
            </ReactQuill>
            <div>
                <LocalOfferIcon/> 
                <BookmarkIcon/> 
            </div>
        </div>
    )
}




export default withStyles(styles)(Editor);