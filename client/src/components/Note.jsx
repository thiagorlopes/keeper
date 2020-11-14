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
    completed: props.completed,
  });

  // A note is editable if the user clicks on the edit button
  const [editable, setEditable] = useState(false);
  const [complete, setComplete] = useState(props.completed);

  // Handle event passed by input or textarea
  function handleChange(e) {
    const { name, value } = e.target;

    // Set input or textarea value according to name: title or content
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  // Update  status in server at each change in note object, if not being edited
  useEffect(() => {
    if(!editable) {
      updateNoteService();
    }
  }, [note]);

  function updateNoteService() {
    // Update note through axios
    NoteDataService.update(note.id, note)
      .then((response) => {
        console.log(response.data);
        props.onRefresh();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function onCancel() {
    setNote((note) => {
      return {
        ...note,
        id: props.id,
        title: props.title,
        content: props.content,
      };
    });

    setEditable(false);
  }

  function toggleComplete() {
    let status = !complete;
    setComplete(status);
    setNote((note) => {
      return {
        ...note,
        completed: status,
      };
    });
  }

  // Render Note
  return (
    <div className="note">

      <Button type="complete" id={note.id} complete={complete} toggleComplete={toggleComplete}/>
      <NoteTitle title={note.title} onChange={handleChange} editable={editable} complete={complete}/>
      <NoteContent content={note.content} onChange={handleChange} editable={editable} complete={complete} />

      {/* Delete button calls onDelete in App.jsx */}
      {!editable && (<Button type="delete" id={note.id} onDelete={() => {props.onDelete(note.id); }} />)}

      {/* Cancel note editing */}
      {editable && (<Button type="cancel" id={note.id} onCancel={() => { onCancel(note.id); }} />)}

      {/* Edit button turns note editable and check circle button turns it off */}
      <Button
        type="edit"
        id={note.id}
        editable={editable}
        onEdit={() => { setEditable(true); }}
        onSubmit={() => {
          updateNoteService();
          setEditable(false);
        }}/>
    </div>
  );
}

export default Note;
