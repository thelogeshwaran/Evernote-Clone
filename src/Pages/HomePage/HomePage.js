import React from "react";
import CardContent from "@material-ui/core/CardContent";
import { useNotes } from "../../Context/NotesProvider";
import "../../App.css";
import { removeHTMLTags } from "../../Components/helpers";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../../Context/AuthProvider";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  const { notes, setSelectNote, setAddingNote } = useNotes();
  const { user } = useAuthProvider();

  function handleCardClick(note) {
    setSelectNote(note);
    navigate("/editor");
  }
  const homeNewNote = () => {
    setAddingNote(true);
    navigate("/editor");
    setSelectNote(null);
  };
  return (
    <div className="contents">
      <div className="homepage-header">
        <h1>Notes</h1>
      </div>
      <div className="notes">
        <div className="cards">
          {notes.map((item) => {
            return (
              <div
                className="card"
                key={item.id}
                onClick={() => handleCardClick(item)}
              >
                <CardContent style={{ height: "280px", width: "180px" }}>
                  <h2>{item.data.title.substring(0, 20) + "..."}</h2>
                  <p>
                    {removeHTMLTags(item.data.body.substring(0, 170) + "...")}
                  </p>
                </CardContent>
              </div>
            );
          })}
          <div className="card create-card">
            <CardContent
              onClick={() => homeNewNote()}
              style={{
                height: "280px",
                width: "180px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NoteAddIcon style={{ color: "green" }} />
              <div>
                <p>Create</p>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
