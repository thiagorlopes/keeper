import React from "react";

function NoteTitle(props) {
  return (
    <div>
      {props.editable && (
        <input
          className="note-title"
          onChange={props.onChange}
          value={props.title}
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
      )}

      {!props.editable && <h1 className="note-title">{props.title}</h1>}
    </div>
  );
}

export default NoteTitle;
