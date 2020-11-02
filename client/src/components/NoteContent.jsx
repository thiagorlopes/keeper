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

      {!props.editable && <p className="note-content">{props.content}</p>}
    </div>
  );
}
export default NoteContent;
