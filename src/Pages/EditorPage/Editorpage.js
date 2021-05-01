import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useNotes } from "../../Context/NotesProvider";
import Editor from "../../Components/Editor/Editor";
import "../../App.css";

export default function Editpage() {
  const { selectNote } = useNotes();

  return (
    <div className="content">
      <Sidebar />
      {selectNote && <Editor />}
    </div>
  );
}
