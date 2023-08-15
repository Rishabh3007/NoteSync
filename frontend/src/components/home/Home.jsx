import React, { useState,useEffect } from "react";
import CreateArea from "./CreateArea";
import Note from "./Note";
import "./home.css";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate  = useNavigate();

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [notes, setNotes] = useState([]);

  const mynotes = async () => {
    try {
      const res = await fetch('/mynotes/', {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
      });
      const data = await res.json();
      setNotes(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const callHomePage = async () => {
    try{
      const res = await fetch('/auth', {
        method: "GET",
        credentials: "include"
      });
      if(res.status !== 200){
        navigate('/signin');
      }
      else{
        setUserLoggedIn(true);
      }
    }
    catch(err){
      console.log(err);
    }
  }



    useEffect(() => {
      callHomePage();
      // eslint-disable-next-line
    }, []);

    useEffect(() => {
      if(userLoggedIn){
        mynotes();
      }
      // eslint-disable-next-line
    }, [userLoggedIn]);

  
  return (
    <div>
      <CreateArea setNotes={setNotes}/>
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            setNotes={setNotes}
            notes={notes}
          />
        );
      })}
    </div>
  )
}


export default Home