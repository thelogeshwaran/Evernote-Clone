import React, { useEffect, useState } from "react";
import CardContent from '@material-ui/core/CardContent';
import "./App.css";
import { removeHTMLTags } from "./helpers";
import DeleteIcon from '@material-ui/icons/Delete';
import {useFirestore} from "./Firebase/Firebase";
import RestoreIcon from '@material-ui/icons/Restore';
import firebase from "firebase";
import { useAuthProvider } from "./Context/AuthProvider";




function TrashPage() {

    
    const [bin, setBin]=useState([]);
    const { user } = useAuthProvider();
    

    useEffect(()=>{
        useFirestore
        .collection("bin")
        .orderBy("timeStamp","desc")
        .onSnapshot( snap =>{
            const documents=(snap.docs.map((doc)=>({
                id: doc.id,
                data: doc.data()
            }))
            )

            setBin(documents.filter((item)=> item.data.userId === user?.uid))
        })
        
    },[])
    
    async function deleteNote(note){

        await useFirestore
        .collection("bin")
        .doc(note.id)
        .delete()
    }

    async function restoreNote(note){
        // console.log(note)
        await useFirestore
        .collection("bin")
        .doc(note.id)
        .delete()

        await useFirestore
        .collection("notes")
        .add({
            userId : note.data.userId,
            title : note.data.title,
            body : note.data.body,
            tag:note.data.tag,
            pinned : note.data.pinned,
            timeStamp : firebase.firestore.FieldValue.serverTimestamp()
        }
        )

        
    }



    // console.log(bin)
    return (
        
        <div className="content">
            <div className="homepage-header">
                    <h1>Trash Bin</h1>
            </div>

            <div className="notes">
                
                 {
                    bin.length > 0  ? 
                        <div>

                            <div className="cards">
                            
                            {
                               bin && bin.map((item)=>{
                                        return (
                                            <div className="card" key={item.id}>
                                                <CardContent style={{ height:"280px", width:"180px", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                                                    <div>
                                                        <h2>{item.data.title.substring(0,10)+"..."}</h2>
                                                        <p>{removeHTMLTags(item.data.body.substring(0,170)+"...")}</p>
                                                    </div>
                                                    <div>
                                                        <RestoreIcon onClick={ () => restoreNote(item)} style={{ padding: "3% 10%"}} />
                                                        <DeleteIcon  onClick={ () => deleteNote(item)} style={{ padding: "3% 10%", marginLeft:"25%", ':hover':{ color: 'red'}}}></DeleteIcon>
                                                    </div>
                                                </CardContent>
                                            </div>
                                            
                                            )
                                    
                                    }) 
                            }
                            </div>
                        </div>
                    : 
                        <div>
                            <h3>Your Trash Bin is Empty!</h3>
                        </div>

                 }
                    
                
            </div>
       
        </div>
    )
}



export default TrashPage;
