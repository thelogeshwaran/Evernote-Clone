import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from "../helpers";
import {useFirestore} from "../Firebase/Firebase";


function SidebarItem({classes , note, selectNote, setSelectNote}){
    async function deleteNote(note){
        
        await useFirestore
        .collection("notes")
        .doc(note.id)
        .delete()
        setSelectNote(null)
    }


    // console.log(note)
    return(
        <div>
            <ListItem className={classes.listIem} selected ={selectNote ? selectNote.id === note.id : null} alignItems="flex-start" onClick={()=>setSelectNote(note)}>
                <div className={classes.textSection} >
                    <ListItemText primary={note.data.title} secondary={removeHTMLTags(note.data.body.substring(0,30)+"...")}></ListItemText>
                    <DeleteIcon className={classes.deleteIcon} onClick={ () => deleteNote(note)}></DeleteIcon>
                </div>
            </ListItem>
        </div>
    )
}

export default withStyles(styles)(SidebarItem);