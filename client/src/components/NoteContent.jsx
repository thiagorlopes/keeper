import React from "react";
import AutoTextArea from "./AutoTextArea";

function NoteContent(props) {
  return (
    <div>
      {props.editable && (
        <AutoTextArea
          onChange={props.onChange}
          className="note-content"
          content={props.content}
          rows="1"
        />
      )}

      {!props.editable && (
        <p
          className="note-content"
          style={{ textDecorationLine: props.complete ? "line-through" : null }}
        >
          {props.content}
        </p>
      )}
    </div>
  );
}
export default NoteContent;
