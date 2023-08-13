import React, { useState,useEffect } from "react";
import CreateArea from "./CreateArea";
import Note from "./Note";
import "./home.css";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate  = useNavigate();
  const callHomePage = async () => {
    try{
      const res = await fetch('/auth', {
        method: "GET",
        credentials: "include"
      });
      if(res.status !== 200){
        navigate('/signin');
      }
      return 0;
    }
    catch(err){
      console.log(err);
    }
  }

    useEffect(() => {
      callHomePage();
      // eslint-disable-next-line
    }, []);

    const [notes, setNotes] = useState([]);
  
    function addNote(newNote) {
      setNotes(prevNotes => {
        return [...prevNotes, newNote];
      });
    }
  
    function deleteNote(id) {
      setNotes(prevNotes => {
        return prevNotes.filter((noteItem, index) => {
          return index !== id;
        });
      });
    }

  return (
    <div>
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
  )
}


export default Home