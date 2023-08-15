import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {
  function handleClick() {
    fetch('/deletenote', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        noteID: props.id
      }),
      credentials: "include"
    });
    props.setNotes(props.notes.filter((note) => note._id !== props.id));
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button>
        <DeleteIcon onClick={handleClick}/>
      </button>
    </div>
  );
}

export default Note;
