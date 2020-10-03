import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";

function InputArea(props) {
  // Input and text area are initially blank
  const [newNote, setNewNote] = useState({
    id: 0,
    editable: false,
    title: "",
    content: "",
  });

  // Change content of new note state
  function handleChange(event) {
    const { name, value } = event.target;

    setNewNote((prevNote) => {
      return {
        ...prevNote,
        id: props.lastId,
        [name]: value,
      };
    });
  }

  // Pass new note to 'App' for inserting on array and clear input area
  function submitNote(event) {
    props.onAdd(newNote);

    props.increaseLastId();

    setNewNote((prevNote) => {
      return { ...prevNote, id: props.lastId, title: "", content: "" };
    });
  }

  // Render InputArea
  return (
    <div>
      <form className="input-area">
        <input
          autoFocus
          className="note-title"
          onChange={handleChange}
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
        <button className="input-area" type="button" onClick={submitNote}>
          <AddIcon />
        </button>
      </form>
    </div>
  );
}

export default InputArea;
