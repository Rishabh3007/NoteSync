import React, { useState, useEffect } from "react";
import CreateArea from "./CreateArea";
import Note from "./Note";
import "./home.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Home = () => {
  const navigate = useNavigate();

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const mynotes = async () => {
    try {
      const res = await fetch("https://notesync-backend.onrender.com/mynotes/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      });
      const data = await res.json();
      setNotes(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const callHomePage = async () => {
    try {
      const res = await fetch("https://notesync-backend.onrender.com/auth", {
        method: "GET",
        mode: "cors",
        credentials: "include",
      });
      if (res.status !== 200) {
        navigate("/signin");
      } else {
        setUserLoggedIn(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callHomePage();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userLoggedIn) {
      mynotes();
    }
    // eslint-disable-next-line
  }, [userLoggedIn]);

  // useEffect(() => {
  //   console.log(selectedNote);
  // }, [selectedNote]);

  return (
    <div className="col-md-10 col-12 mx-auto home_page">
      <CreateArea
        setNotes={setNotes}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />
      <div className="notes-area">
        {!loading ? (
          notes.map((noteItem) => {
            return (
              <Note
                key={noteItem._id}
                id={noteItem._id}
                title={noteItem.title}
                content={noteItem.content}
                setNotes={setNotes}
                notes={notes}
                setSelectedNote={setSelectedNote}
              />
            );
          })
        ) : (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"50vh"}
          >
            <CircularProgress />
          </Box>
        )}
      </div>
    </div>
  );
};

export default Home;
