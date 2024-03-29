import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const BASE_URL = "https://inotebook-backend18052.onrender.com";

  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);
  // const [notes, setNotes] = useState({ notesArray: [] });

  //Get All Notes
  //Add a note
  const getNotes = async () => {
    //API Call
    const response = await fetch(`${BASE_URL}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
    // json ? setNotes(json) : setNotes([])
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //API Call

    const response = await fetch(`${BASE_URL}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
    // setNotes(prevNotes => ({
    //   ...prevNotes,
    //   notesArray: [...prevNotes.notesArray, note]
    // }));
  };

  //Delete a note
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${BASE_URL}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${BASE_URL}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    // console.log(json)
    //Code to editNote
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
