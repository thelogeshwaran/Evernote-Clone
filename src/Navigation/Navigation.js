import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import HomeIcon from '@material-ui/icons/Home';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';


export default function Navigation() {

    return (
        <div className="nav-tab">
            <ul className="unordered-list">
                <li className="list search-list"><SearchIcon/><input className="search" placeholder="search"></input></li>
                <li className="list new-note-list"><AddIcon/> <button>New Note</button></li>
                <li className="list"> <HomeIcon/> <button>Home</button></li>
                <li className="list"><NoteAddIcon/><button>Notes</button> </li>
                <li className="list"><LocalOfferIcon/> <button>Tags</button></li>
                <li className="list"><DeleteIcon/> <button>Trash</button></li>
            </ul>
        </div>
    )
}