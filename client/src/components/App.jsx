import React, { useState } from "react";
import Header from "./Header";
import InputArea from "./InputArea";
import Note from "./Note";
import Footer from "./Footer";

function App() {
  // Store all notes in an array
  const [notes, setNotes] = useState([]);

  // Unique id for each note
  const [lastId, setCurrentId] = useState(0);

  // Define which note is currently being edited
  const [editableId, setEditableId] = useState();

  // Increase current id by 1
  function increaseLastId(d) {
    setCurrentId((prevId) => {
      return prevId + 1;
    });
  }

  // Add new note to array
  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  // Delete note by id
  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((currentNote, index) => {
        return currentNote.id !== id;
      });
    });
  }

  // Update note by id
  function updateNote(id) {
    notes.map(function (note, index) {
      if (note.id === id) {
        setEditableId(note.id);
        console.log(editableId);
      }
    });
  }

  // Render App
  return (
    <div>
      <Header />
      <InputArea
        onAdd={addNote}
        lastId={lastId}
        increaseLastId={increaseLastId}
      />
      {notes.map(function (note, index) {
        return (
          <Note
            key={note.id}
            id={note.id}
            editableId={editableId}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
            onUpdate={updateNote}
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
