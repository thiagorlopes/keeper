import React, { useState, useEffect } from "react";
import NoteDataService from "../services/NoteService";
import NoteTitle from "./NoteTitle";
import NoteContent from "./NoteContent";
import Button from "./Button";

function Note(props) {
  // Set initial content to data in App's notes array
  const [note, setNote] = useState({
    id: props.id,
    title: props.title,
    content: props.content,
  });

  // A note is editable if the user clicks on the edit button
  const [editable, setEditable] = useState(false);

  const [height, setContentHeight] = useState(100);

  // Handle event passed by input or textarea
  function handleChange(e) {
    let minHeight = 150;
    let newHeight = e.target.scrollHeight;

    newHeight = newHeight < minHeight ? minHeight : newHeight;

    const { name, value } = e.target;

    // Set input or textarea value according to name: title or content
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });

    // Set textarea height removing 4px of padding on top and bottom from scrollHeight
    setContentHeight(newHeight);
  }

  function updateNoteService() {
    console.log(note);
    // Update note through axios
    NoteDataService.update(note.id, note)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // Ref for acesssing note content text area

  // Render Note
  return (
    <div className="note">
      <form>
        <NoteTitle
          title={note.title}
          onChange={handleChange}
          editable={editable}
        />

        <NoteContent
          content={note.content}
          onChange={handleChange}
          editable={editable}
          height={height}
        />
      </form>

      {/* Delete button calls onDelete in App.jsx */}
      <Button
        type="delete"
        id={note.id}
        onDelete={() => {
          props.onDelete(note.id);
        }}
      />

      {/* Edit button turns note editable and check circle button turns it off */}
      <Button
        type="edit"
        id={note.id}
        editable={editable}
        onEdit={() => {
          setEditable(true);
        }}
        onSubmit={() => {
          updateNoteService();
          setEditable(false);
        }}
      />
    </div>
  );
}

export default Note;
