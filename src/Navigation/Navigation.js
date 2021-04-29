import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import HomeIcon from '@material-ui/icons/Home';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import { useNotes } from "../Context/NotesProvider";
import { auth } from "../Firebase/Firebase";
import { useAuthProvider } from "../Context/AuthProvider";
import { MdExitToApp } from "react-icons/md";
import { useRadioGroup } from "@material-ui/core";
import { GiElephant } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";





export default function Navigation() {
    
    const { setAddingNote, setSelectNote, notes, search, setSearch } = useNotes();
    
    const signOut = ()=> {

        auth.signOut();
    }

    const newNoteNav = ()=>{
        setSelectNote(null)
        setAddingNote(true);
    }

    console.log(search)
    return (
        <div className="nav-tab">

            <ul className="unordered-list">
                <div className="app-heading"> 
                    <h1> <GiElephant/> Pevernote</h1>
                </div>
                
                {/* {search ? : <SearchIcon/> } */}
                <li className="list search-list">
                   {search ? <ImCancelCircle style={{ paddingRight:"3%"}} onClick={()=> setSearch("")}/> : <SearchIcon/>  } 
                   <input className="search" placeholder="search" value={search} onChange={(e)=> setSearch(e.target.value)}>
                        </input>
                </li>

                <li className="list new-note-list" onClick={()=>newNoteNav()}>
                    <Link  to="/editor" className="nav-link" >
                         <AddIcon/> <button >New Note</button> 
                    </Link>
                </li>

                <li className="list">
                    <Link to="/" className="nav-link">
                      <HomeIcon/> <button>Home</button>
                    </Link>  
                </li>

                <li className="list">
                    <Link to="/editor" className="nav-link" onClick={()=>setSelectNote(notes[0])}>
                      <NoteAddIcon/><button>Notes</button>
                    </Link>
                </li>

                {/* <li className="list">
                    <LocalOfferIcon/> <button>Tags</button>
                </li> */}

                <li className="list">
                    <Link to="/bin" className="nav-link">
                        <DeleteIcon/> <button>Trash</button>
                    </Link>
                    
                </li>

                
            </ul>
            <div className="list profile">
                    <h3>Sign out</h3>
                    <button onClick={()=>signOut()}><MdExitToApp/></button>
            </div>
            
        </div>
    )
}