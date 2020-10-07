import React, { useState } from "react";
import NoteDataService from "../services/NoteService";
import Header from "./Header";
import InputArea from "./InputArea";
import Note from "./Note";
import Footer from "./Footer";

function App() {
  // Store all notes in an array
  const [notes, setNotes] = useState([]);

  // Fill notes array with notes in database
  NoteDataService.getAll()
    .then((response) => {
      setNotes(response.data);
    })
    .catch((e) => {
      console.log(e);
    });

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
        console.log();

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
      <Header />
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
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
