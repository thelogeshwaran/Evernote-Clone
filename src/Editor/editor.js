import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import {useFirestore} from "../Firebase/Firebase";
import { useNotes } from "../Context/NotesProvider";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import DeleteIcon from '@material-ui/icons/Delete';
import "../App.css";
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import NativeSelect from '@material-ui/core/NativeSelect';




function Editor({classes}){

    const { selectNote,setSelectNote, notes, tagOptions, setTagOptions } = useNotes();
    
    const [ text, setText ] = useState("");
    const [title , setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [pinned, setPinned] = useState(null);
    const [newTag, setNewTag] = useState("");
    
   

    



    useEffect(()=>{
        setTitle(selectNote.data.title)
         setText(selectNote.data.body)
         setTag(selectNote.data.tag) 
         setPinned(selectNote.data.pinned)
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

    
    const handleChange=(event)=>{
        
        useFirestore
                .collection("notes")
                .doc(selectNote.id)
                .update({
                     tag : event.target.value
                })
                setTag(event.target.value)
        // console.log(event.target.value)
    }

    const handlePinned=()=>{
        setPinned(!pinned)
        useFirestore
                .collection("notes")
                .doc(selectNote.id)
                .update({
                     pinned : !pinned
                })
    }
     
   const handleNewTag = () => {
       let updatedTags = {...tagOptions, data:{...tagOptions.data, tags:[...tagOptions.data.tags, newTag] }}
    //    console.log(updatedTags)
       setTagOptions(updatedTags)
       setNewTag("")

       useFirestore
                .collection("tags")
                .doc(tagOptions.id)
                .update({
                     tags: [...tagOptions.data.tags, newTag]
                })
   }

    async function deleteNote(note){
        // console.log(note)
        const index = notes.indexOf(note)
        console.log(index)
        if(index > 0){
            setSelectNote(notes[index-1])
        }else{
            setSelectNote(notes[1])
        }
        
        await useFirestore
        .collection("notes")
        .doc(note.id)
        .delete()
        

        await useFirestore
        .collection("bin")
        .add({
            userId : note.data.userId,
            id : note.id,
            title : note.data.title,
            body : note.data.body,
            tag: note.data.tag,
            pinned : note.data.pinned,
            timeStamp : note.data.timeStamp
        })

       
        
    }
    // console.log(selectNote)
    // console.log(tagOptions)

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
        <div className={classes.editor}>
            <div className={classes.editorContainer}>
                <div className={classes.editorHeading}>
                    <div className={classes.editorTitle}>
                        <div>
                            <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
                        </div>
                        <div>
                           <input className={classes.titleInput} placeholder="Note Title" value ={title}  onChange={(e)=> setTitle(e.target.value)}>
                           </input>
                        </div>
                        
                    </div>

                        
                    

                </div>
                <ReactQuill value={text} onChange={(val)=> setText(val)} modules={modules}>
                </ReactQuill>
            </div>
            <div className={classes.editorFooter} >
                        <div className="editor-tags">
                            <div className="tags">
                            <LocalOfferIcon style={{ padding: "0px"}}/>
                                <FormControl style={{paddingLeft:"5%", width:"25%",marginTop:"-3%"}}>
                                        <InputLabel htmlFor="uncontrolled-native">Tag</InputLabel>
                                            <NativeSelect
                                            onChange={handleChange}
                                            // value={selectNote.data.tag}
                                            >
                                                <option>{tag}</option>
                                            {
                                               tagOptions.data.tags && tagOptions.data.tags.map((item)=>{
                                                    return(
                                                        <option value={item}>{item}</option>
                                                    )
                                                })
                                            }
                                            
                                            </NativeSelect>
                            </FormControl>
                          
                                <Input placeholder="New Tag" value={newTag} onChange={(e)=> setNewTag(e.target.value)} style={{marginLeft:"7%"}}/>
                                { newTag && <Button style={{backgroundColor:"green",color:"white",marginLeft:"2%"}} onClick={()=>{handleNewTag()}}>Add</Button>}
                            
                            
                            
                            </div>
                            <div >
                            {
                                pinned ? 
                                <div className="pinned">
                                    <BookmarkIcon  onClick={handlePinned}/> <p>Pinned</p>
                                </div> 
                                :
                                <div className="pinned">
                                    <BookmarkBorderIcon onClick={handlePinned} /> <p>Pin</p>
                                </div>  
                            }
                            </div>
                            
                        </div>
                        <div className="delete-content">
                          <DeleteIcon className={classes.deleteIcon} onClick={ () => deleteNote(selectNote)} style={{ padding: "2% 3%"}}></DeleteIcon> Move to Trash
                        </div>
            </div>
            
        </div>
        
    )
}




export default withStyles(styles)(Editor);