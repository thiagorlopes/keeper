import React, { useState } from "react";
import NoteDataService from "../services/NoteService";
import Button from "./Button";

function InputArea(props) {
  // Input and textarea are initially blank
  const [newNote, setNewNote] = useState({
    id: 1,
    title: "",
    content: "",
  });

  // Set id for new note and input or textarea value according to name: title or content
  function handleChange(event) {
    const { name, value } = event.target;

    setNewNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  // Attempts to create note with controller
  function submitNote(event) {
    NoteDataService.create(newNote)
      .then((response) => {
        // Clears input area for new input
        setNewNote((prevNote) => {
          return {
            ...prevNote,
            title: "",
            content: "",
          };
        });

        // Pass new note to App.jsx for inserting in array
        console.log(response.data);

        props.onAdd(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // Render InputArea
  return (
    <div>
      <form className="input-area" required>
        <input
          className="note-title"
          onChange={handleChange}
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
          value={newNote.title}
          name="title"
          placeholder="Title"
        />
        <textarea
          className="note-content"
          onChange={handleChange}
          value={newNote.content}
          name="content"
          placeholder="Take a note..."
          rows="3"
        />

        <Button
          type="add"
          className="input-area"
          onAdd={newNote.title !== "" ? submitNote : null}
        />
      </form>
    </div>
  );
}

export default InputArea;
