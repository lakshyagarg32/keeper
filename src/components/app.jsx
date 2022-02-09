import React, { useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import CreateNote from "./createnote";
import Note from "./note";

function App(){
    const [notes,setNotes]=React.useState([]);
    const [note,setNote]=React.useState({title:"",content:""});
    const [isedit,setisEdit]=React.useState(false);
    const [noteid,setnoteid]=React.useState(null);

    function addNote(note){
        setNotes(function(prev){
            return (
                [...prev,note]
            );
        });
    }

    function deleteNote(id){
        setNotes(function(prev){
            return prev.filter(function(item,index){
                return index!==id;
            });
        });
        setisEdit(false);
        setNote({
            title:"",
            content:""
        });
    }

    function editNote(id,note){
        setNotes(function(prev){
            prev[id]=note;
            return prev
        });
        setisEdit(false);
        setNote({
            title:"",
            content:""
        });
        setnoteid(null);
        setlocalnotes();
    }

    function triggereditNote(id){
        setnoteid(id);
        setisEdit(true);
        setNote({
            title:notes[id].title,
            content:notes[id].content
        });
    }

    useEffect(function(e){
        getlocalnotes();
    },[]);

    useEffect(function(){
        setlocalnotes();
    },[notes]);

    function getlocalnotes(){
        if(localStorage.getItem("notes")===null){
            localStorage.setItem("notes",JSON.stringify(notes));
        }
        else{
            const localNotes=JSON.parse(localStorage.getItem("notes"));
            setNotes(localNotes);
        }  
    }

    function setlocalnotes(){
        localStorage.setItem("notes",JSON.stringify(notes));
    }

    return (
        <div>
        <Header />
        <CreateNote title={note.title} id={noteid} content={note.content} add={addNote} isedit={isedit} edit={editNote}/>
        {notes.map(function(note,index){
            return (
                <Note key={index} id={index} title={note.title} content={note.content} delete={deleteNote} edit={triggereditNote} />
            );
        })}
        <Footer />
        </div>
    );
}

export default App;