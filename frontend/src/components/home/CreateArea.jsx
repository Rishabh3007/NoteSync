import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
// import { set } from "mongoose";

function CreateArea({setNotes}) {
  const [isExpanded, setExpanded] = useState(false);

  function expand() {
    setExpanded(true);
  }

  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  const submitNote = async (event) => {
    event.preventDefault();
    const res = await fetch('/addnote', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: newNote.title,
        content: newNote.content
      }),
      credentials: "include"
    });
    const data = await res.json();
    setNotes(prevNotes => {
      return [...prevNotes, data];
    });
    setNewNote({
      title: "",
      content: ""
    });
  }

  return (
    <div>
      <form className="create-note" method="POST">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={newNote.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={newNote.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab>
            <AddIcon onClick={submitNote} />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
