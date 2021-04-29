import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { removeHTMLTags } from "../helpers";
import {useFirestore} from "../Firebase/Firebase";
import { useNotes } from '../Context/NotesProvider';
import "../App.css"


function SidebarItem({classes, note}){

    const { selectNote, setSelectNote } = useNotes();
   

    


    // console.log(note)
    return(
        <div className="note" onClick={()=>setSelectNote(note)} style={selectNote?.id === note.id ?  {backgroundColor:"#ECFDF5"} : {backgroundColor:"inherit"}}>
            <div>
                <ListItem className={classes.listItem} >
                    <div  className={classes.textSection} >
                        <ListItemText  primary={note.data.title.length > 25 ? note.data.title.substring(0,25)+"...": note.data.title} secondary={removeHTMLTags(note.data.body.substring(0,25)+"...")}></ListItemText>
                    </div>
                </ListItem>
            </div>
            <div className="note-tag">
                {note.data.tag}
            </div>
        </div>
    )
}

export default withStyles(styles)(SidebarItem);