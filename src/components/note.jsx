import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function note(props){

    return (
        <div className="note">
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <button onClick={function(){
            props.delete(props.id);
        }}>
        <DeleteIcon /></button>
        <button onClick={function(){
            props.edit(props.id);
        }}>
        <EditIcon /></button>
        </div>
    );
}

export default note;