import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import { useNotes } from "../../Context/NotesProvider";
import { auth } from "../Firebase/Firebase";
import { MdExitToApp } from "react-icons/md";
import { GiElephant } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import "./Navigation.css";
import "../../App.css";

export default function Navigation() {
  const { setAddingNote, setSelectNote, notes, search, setSearch } = useNotes();

  const signOut = () => {
    auth.signOut();
  };

  const newNoteNav = () => {
    setSelectNote(null);
    setAddingNote(true);
  };

  // console.log(search)
  return (
    <div className="nav-tab">
      <ul className="unordered-list desktop">
        <div className="app-heading">
          <h1>
            {" "}
            <GiElephant /> Pevernote
          </h1>
        </div>

        <li className="list search-list">
          {search ? (
            <ImCancelCircle
              style={{ paddingRight: "3%" }}
              onClick={() => setSearch("")}
            />
          ) : (
            <SearchIcon />
          )}
          <input
            className="search"
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </li>

        <li className="list new-note-list" onClick={() => newNoteNav()}>
          <NavLink to="/editor" className="nav-link">
            <AddIcon /> <button>New Note</button>
          </NavLink>
        </li>

        <li className="list">
          <NavLink
            to="/"
            end
            activeStyle={{ backgroundColor: "#3F403F" }}
            className="nav-link"
          >
            <HomeIcon /> <button>Home</button>
          </NavLink>
        </li>

        <li className="list">
          <NavLink
            activeStyle={{ backgroundColor: "#3F403F" }}
            to="/editor"
            className="nav-link"
            onClick={() => setSelectNote(notes[0])}
          >
            <NoteAddIcon />
            <button>Notes</button>
          </NavLink>
        </li>

        <li className="list">
          <NavLink
            activeStyle={{ backgroundColor: "#3F403F" }}
            to="/bin"
            className="nav-link"
          >
            <DeleteIcon /> <button>Trash</button>
          </NavLink>
        </li>
      </ul>
      <div className="list profile ">
        <h3>Sign out</h3>
        <button onClick={() => signOut()}>
          <MdExitToApp />
        </button>
      </div>

      <div className="mobile">
        <ul className="unordered-list">
          <div className="app-heading">
            <h1>
              {" "}
              <GiElephant />{" "}
            </h1>
            {/* Pevernote */}
          </div>

          <li
            className="list "
            style={{ backgroundColor: "#00A82D" }}
            onClick={() => newNoteNav()}
          >
            <NavLink to="/editor" className="nav-link">
              <button>
                <AddIcon />
              </button>
            </NavLink>
          </li>

          <li className="list">
            <NavLink
              to="/"
              end
              activeStyle={{ backgroundColor: "#3F403F" }}
              className="nav-link"
            >
              <button>
                <HomeIcon />
              </button>
            </NavLink>
          </li>

          <li className="list">
            <NavLink
              to="/editor"
              activeStyle={{ backgroundColor: "#3F403F" }}
              className="nav-link"
              onClick={() => setSelectNote(notes[0])}
            >
              <button>
                <NoteAddIcon />
              </button>
            </NavLink>
          </li>

          <li className="list">
            <NavLink
              to="/bin"
              activeStyle={{ backgroundColor: "#3F403F" }}
              className="nav-link"
            >
              <button>
                <DeleteIcon />
              </button>
            </NavLink>
          </li>
        </ul>
        <div className="list signout">
          <button onClick={() => signOut()}>
            <MdExitToApp />
          </button>
        </div>
      </div>
    </div>
  );
}
