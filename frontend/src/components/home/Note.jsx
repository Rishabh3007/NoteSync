import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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

  function handleEdit() {
    props.setSelectedNote({
      title: props.title,
      content: props.content,
      id: props.id
    });
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button>
        <EditIcon onClick={handleEdit} />
        <DeleteIcon onClick={handleClick}/>
      </button>
    </div>
  );
}

export default Note;
