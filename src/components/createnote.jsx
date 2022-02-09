import React from "react";
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';

function Createnote(props){
    const [note,setNote]=React.useState({title:"",content:""});
    const [expand,setExpand]=React.useState(false);
    let edit=props.isedit;

    React.useEffect(
        function(){
            setNote({
                title:props.title,
                content:props.content,
            });
            if(edit===true){
                setExpand(true);
            }
        },
        [edit]);

    function handlechange(event){
        const name=event.target.name;
        const value=event.target.value;
        setNote(function(prev){
            return ({
                ...prev,
                [name]:value
            });
        });
    }
    
    function add(event){
        event.preventDefault();
        if(edit===true){
            props.edit(props.id,note);
        }
        else{
            props.add(note); 
        }
        setNote({title:"",content:""});
        setExpand(false);
    }

    return (
        <div>
            <form className="create-note">
                <input 
                     name="title"
                     placeholder="Title"
                     value={note.title}
                     onChange={handlechange}
                     style={{display:expand?"inline":"none"}}
                />
                <textarea 
                    name="content"
                    placeholder="Take a note..."
                    rows={expand?"3":"1"}
                    value={note.content}
                    onChange={handlechange}
                    onClick={function(){
                        setExpand(true);
                    }}
                />
                <Zoom in={expand}>
                <button 
                onClick={add}
                style={{display:expand?"inline":"none"}}
                >
                <AddIcon /></button>
                </Zoom>
            </form>
        </div>
    );
}

export default Createnote;