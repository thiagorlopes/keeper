import React from "react";

function NoteContent(props) {
  return (
    <div>
      {props.editable && (
        <textarea
          className="note-content"
          value={props.content}
          onChange={(e) => {
            props.onChange(e);
          }}
          onClick={(e) => {
            props.onChange(e);
          }}
          name="content"
          style={{
            height: props.height + "px",
            outline: 0,
            border: "1px solid rgb(138, 137, 137)",
          }}
        />
      )}

      {!props.editable && <p className="note-content">{props.content}</p>}
    </div>
  );
}
export default NoteContent;
