import React, { useState, useEffect, useRef } from "react";
import NoteBody from "./NoteBody";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import NoteOperation from "./NoteOperation";

function Note(props) {
  // Set note according to initial content
  const [note, setNote] = useState({
    id: props.id,
    editable: false,
    title: props.title,
    content: props.content,
  });

  // Dynamically change height of input element
  const [height, setHeight] = useState(100);

  // Change content of controlled component
  function handleChange(e) {
    const height = e.target.scrollHeight;

    const { name, value } = e.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });

    // Set height removing 4px of padding on top and bottom from scrollHeight
    setHeight(height - 8);
  }

  function onUpdate() {
    if (!isEditable) {
      setIsEditable(true);
    }
  }

  // Store state for when a note is editable
  const [isEditable, setIsEditable] = useState(false);

  // Ref for accessing the note's div node
  const ref = useRef(null);

  // Turns off note editing if clicked outside div
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
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
  const noteBody = (
    <NoteBody
      onChange={handleChange}
      note={note}
      isEditable={isEditable}
      height={height}
    />
  );

  // Render Note
  return (
    <div className="note" ref={ref}>
      {noteBody}
      <button
        onClick={() => {
          props.onDelete(note.id);
        }}
      >
        <DeleteIcon />
      </button>
      <button
        onClick={() => {
          props.onUpdate(note.id);
        }}
      >
        <EditIcon />
      </button>
    </div>
  );
}

export default Note;
