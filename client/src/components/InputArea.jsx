import React, { useState } from "react";
import Button from "./Button";

function InputArea(props) {
  // Input and textarea are initially blank
  const [newNote, setNewNote] = useState({
    id: 0,
    title: "",
    content: "",
  });

  // Id grows for each added note for ensuring uniqueness of key
  const [nextId, setNextId] = useState(0);

  function increaseNextId(id) {
    setNextId((prevId) => {
      return prevId + 1;
    });
  }

  // Set id for new note and input or textarea value according to name: title or content
  function handleChange(event) {
    const { name, value } = event.target;

    setNewNote((prevNote) => {
      return {
        ...prevNote,
        id: nextId,
        [name]: value,
      };
    });
  }

  // Pass new note to 'App' for inserting on array
  function submitNote(event) {
    props.onAdd(newNote);

    // Clear input area and increase id for next value
    setNewNote((prevNote) => {
      return { ...prevNote, title: "", content: "" };
    });

    increaseNextId();
  }

  // Render InputArea
  return (
    <div>
      <form className="input-area" required>
        <input
          autoFocus
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
