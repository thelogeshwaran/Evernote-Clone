import { createContext, useContext, useState } from "react";
import { useNotes } from "./NotesProvider";
import { useFirestore } from "../Components/Firebase/Firebase";

const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const { notes, selectNote, setSelectNote, tagOptions } = useNotes();

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [pinned, setPinned] = useState(null);
  const [newTag, setNewTag] = useState("");

  const handleChange = (event) => {
    useFirestore.collection("notes").doc(selectNote.id).update({
      tag: event.target.value,
    });
    setTag(event.target.value);
  };

  const handlePinned = () => {
    setPinned(!pinned);
    useFirestore.collection("notes").doc(selectNote.id).update({
      pinned: !pinned,
    });
  };

 const handleNewTag = () => {
    if(newTag){
      setNewTag("");

    useFirestore
      .collection("tags")
      .doc(tagOptions.id)
      .update({
        tags: [...tagOptions.data.tags, newTag],
      });
    }
  };

  const deleteNote = async (note) => {
   
    const index = notes.indexOf(note);
    console.log(index);
    if (index > 0) {
      setSelectNote(notes[index - 1]);
    } else {
      setSelectNote(notes[1]);
    }

    await useFirestore.collection("notes").doc(note.id).delete();

    await useFirestore.collection("bin").add({
      userId: note.data.userId,
      id: note.id,
      title: note.data.title,
      body: note.data.body,
      tag: note.data.tag,
      pinned: note.data.pinned,
      timeStamp: note.data.timeStamp,
    });
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [{ script: "sub" }, { script: "super" }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  return (
    <>
      <EditorContext.Provider
        value={{
          text,
          setText,
          title,
          setTitle,
          tag,
          setTag,
          pinned,
          setPinned,
          newTag,
          setNewTag,
          handleChange,
          handleNewTag,
          handlePinned,
          deleteNote,
          modules,
        }}
      >
        {children}
      </EditorContext.Provider>
    </>
  );
};

export const useEditorContext = () => {
  return useContext(EditorContext);
};
