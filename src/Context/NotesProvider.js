import React, { createContext, useContext, useState, useEffect} from "react";
import { useFirestore } from "../Firebase/Firebase";

const NotesContext = createContext();

export function NotesProvider ({ children }){


    const [notes, setNotes]=useState([]);

    const [selectNote, setSelectNote]=useState(null);


    useEffect(()=>{
        useFirestore
        .collection("notes")
        .orderBy("timeStamp","desc")
        .onSnapshot(snap=>{
            setNotes(snap.docs.map((doc)=>({
                id: doc.id,
                data: doc.data()
            }))
            )
        })
    },[])
    

   

    return (
        <NotesContext.Provider value={{  notes, setNotes, selectNote, setSelectNote }}>
            { children }
        </NotesContext.Provider>
    )
}


export function useNotes(){
    return  useContext(NotesContext);
}