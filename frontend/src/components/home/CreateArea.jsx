import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
// import { set } from "mongoose";
// import { set } from "mongoose";

function CreateArea({setNotes ,selectedNote, setSelectedNote}) {
  const [isExpanded, setExpanded] = useState(false);
  function expand() {
    setExpanded(true);
  }

  const [newNote, setNewNote] = useState(
    {
      title: "",
      content: ""
    }
  );
  useEffect(() => {
    setNewNote({
      title: selectedNote!==null ? selectedNote.title : "",
      content: selectedNote!==null ? selectedNote.content : ""
    });
  }, [selectedNote]);

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
    newNote.title = newNote.title.trim();
    newNote.content = newNote.content.trim();
    if(!newNote.title || !newNote.content){
      window.alert("Please fill all the fields");
      return;
    }
    if(selectedNote!==null){
      const res = await fetch('https://notesync-backend.onrender.com/editnote', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: selectedNote.id,
          title: newNote.title,
          content: newNote.content,
        }),
        credentials: "include"
      });
      const data = await res.json();
      // console.log(data)
      setNotes((prevNotes) => {
        const newNotes = prevNotes.map(note => {
          if(note._id === selectedNote.id){
            return data;
          }else{
            return note;
          }
        });
        return newNotes;
      });
      setSelectedNote(null);
      setExpanded(false);
      setNewNote({
        title: "",
        content: ""
      });
    }
    else{
      const res = await fetch('https://notesync-backend.onrender.com/addnote', {
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
        return [data, ...prevNotes];
      });
      setNewNote({
        title: "",
        content: ""
      });
    }
  }

  return (
    <div>
      <form className="create-note" method="POST">
        {(isExpanded || selectedNote!==null) && (
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
          rows={(isExpanded || selectedNote!== null) ? 3 : 1}
        />
        <Zoom in={isExpanded || selectedNote!==null}>
          <Fab>
            <AddIcon style={{fontSize: "2.7rem"}} onClick={submitNote} />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
