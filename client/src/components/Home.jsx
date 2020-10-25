import React, { useState, useEffect } from "react";
import NoteDataService from "../services/NoteService";
import InputArea from "./InputArea";
import Note from "./Note";

function Home() {
  // Store all notes in an array
  const [notes, setNotes] = useState([]);

  // Fill notes array with notes in database
  useEffect(() => {
    NoteDataService.getAll()
      .then((response) => {
        setNotes(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // Add new note to array
  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  // Delete note by id
  function deleteNote(id) {
    NoteDataService.remove(id)
      .then((response) => {
        setNotes((prevNotes) => {
          return prevNotes.filter((currentNote, index) => {
            return currentNote.id !== id;
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // Render App
  return (
    <div>
      <InputArea onAdd={addNote} />
      {notes.map(function (note, index) {
        return (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
  );
}

export default Home;
