import React, { useState, useEffect } from "react";
import NoteDataService from "../services/NoteService";
import InputArea from "./InputArea";
import Note from "./Note";

function Home(props) {
  // Store all notes in an array
  const [notes, setNotes] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Fill notes array with notes in database
  useEffect(() => {
    NoteDataService.getAll()
      .then((response) => {
        setNotes(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [refresh]);

  // Toggle refresh callback to be passed to note
  function refreshHome() {
    setRefresh(!refresh);
  }
  // Add new note to array
  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  // Delete note by id
  function deleteNote(id) {
    NoteDataService.remove(id)
      .then(() => {
        setNotes((prevNotes) => {
          return prevNotes.filter((currentNote) => {
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
      <InputArea userId={props.userId} onAdd={addNote} />

      {/* render section name only if notes array isn't empty */}
      {notes.length !== 0 ? <h5 style={{paddingLeft: "1%"}}>To Do</h5> : null}

      {/* render only notes not completed */}
      <div style={{display: "inline-block"}}>
        {notes.filter(note => !note.completed).map(function (note) {
          return (
            <Note
              key={note.id}
              id={note.id}
              userId={props.userId}
              title={note.title}
              content={note.content}
              completed={note.completed}
              onDelete={deleteNote}
              onRefresh={refreshHome}
            />
          );
        })}
      </div>

      {/* render section name only if notes array isn't empty */}
      {notes.length !== 0 ? <h5 style={{paddingLeft: "1%"}}>Completed</h5> : null}

      {/* render only completed notes */}
      <div style={{display: "inline-block"}}>
        {notes.filter(note => note.completed).map(function (note) {
          return (
            <Note
              key={note.id}
              id={note.id}
              userId={props.userId}
              title={note.title}
              content={note.content}
              completed={note.completed}
              onDelete={deleteNote}
              onRefresh={refreshHome}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
