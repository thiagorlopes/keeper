import React, { useState, useEffect, useRef } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import NoteOperation from "./NoteOperation";

function Note(props) {
  // Set note according to initial content
  const [note, setNote] = useState({
    title: props.title,
    content: props.content,
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

  // Store state for when a note is editable
  const [isEditable, setIsEditable] = useState(false);
  const ref = useRef(null);

  // Turns note editable when clicked
  function handleClick(props) {
    setIsEditable(true);
  }

  // Turns off note editing if clicked outside div
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsEditable(false);
    }
  };

  // Create the same effect as componentDidMount and componentDidUnmount
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  // Return input and textarea if note is editable
  var noteElement;

  if (isEditable) {
    noteElement = (
      <form>
        <input onChange={handleChange} value={note.title} name="title" />
        <textarea onChange={handleChange} value={note.content} name="content" />
      </form>
    );
  } else {
    noteElement = (
      <div>
        <h1>{note.title}</h1>
        <p>{note.content}</p>
      </div>
    );
  }

  // Render Note
  return (
    <div className="note" onClick={handleClick} ref={ref}>
      {noteElement}
      <button
        onClick={() => {
          props.onDelete(props.id);
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
