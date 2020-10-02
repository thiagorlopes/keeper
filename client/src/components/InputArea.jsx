import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";

function InputArea(props) {
  // Input and text area are initially blank
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  // Change content of controlled component
  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  // Pass new note over to 'App' for inserting on array and clear input area
  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
  }

  // Render InputArea
  return (
    <div>
      <form className="input-area">
        <input
          className="input-area"
          onChange={handleChange}
          value={note.title}
          name="title"
          placeholder="Title"
        />
        <textarea
          className="input-area"
          onChange={handleChange}
          value={note.content}
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
