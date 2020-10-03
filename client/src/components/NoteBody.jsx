import React from "react";

function NoteBody(props) {
  if (props.isEditable) {
    return (
      <form>
        <input
          className="note-title"
          onChange={props.onChange}
          value={props.note.title}
          name="title"
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
          style={{
            fontWeight: "bold",
            outline: 0,
            border: "1px solid rgb(138, 137, 137)",
          }}
        />
        <textarea
          className="note-content"
          onChange={(e) => {
            props.onChange(e);
          }}
          value={props.note.content}
          name="content"
          style={{
            height: props.height + "px",
            outline: 0,
            border: "1px solid rgb(138, 137, 137)",
          }}
        />
      </form>
    );
  } else {
    return (
      <div>
        <h1 className="note-title">{props.note.title}</h1>
        <p className="note-content">{props.note.content}</p>
      </div>
    );
  }
}

export default NoteBody;
