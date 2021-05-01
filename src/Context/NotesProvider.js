import { Search, SettingsSystemDaydream } from "@material-ui/icons";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useFirestore } from "../Components/Firebase/Firebase";
import { useAuthProvider } from "./AuthProvider";

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const { user } = useAuthProvider();
  const [notes, setNotes] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [selectNote, setSelectNote] = useState(notes[0]);
  const [addingNote, setAddingNote] = useState(false);
  const [docs, setDocs] = useState([]);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    useFirestore
      .collection("notes")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snap) => {
        const documents = snap.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setDocs(documents.filter((item) => item.data.userId === user?.uid));
      });

    useFirestore
      .collection("tags")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snap) => {
        let document = [];
        document = snap.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setTagOptions(document[0]);
      });
  }, [user]);

  useEffect(() => {
    if (search) {
      setNotes(
        docs.filter((item) =>
          item.data.title.toUpperCase().includes(search.toUpperCase())
        )
      );
    } else {
      setNotes(docs);
    }
  }, [docs, search]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        selectNote,
        setSelectNote,
        tagOptions,
        setTagOptions,
        addingNote,
        setAddingNote,
        setSearch,
        search,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}
