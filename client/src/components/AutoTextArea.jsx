import React, { useState, useRef, useEffect } from "react";

function AutoTextArea(props) {
  // Ref for accessing textarea and state for content and its parent div
  const textAreaRef = useRef(null);
  const [text, setText] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState("auto");
  const [parentHeight, setParentHeight] = useState("auto");

  let parentStyle = {
    minHeight: parentHeight,
  };

  let textAreaStyle;

  if (props.inputArea) {
    textAreaStyle = {
      height: textAreaHeight,
    };
  } else {
    textAreaStyle = {
      outline: 0,
      border: "1px solid rgb(138, 137, 137)",
      height: textAreaHeight,
    };
  }

  useEffect(() => {
    setParentHeight(textAreaRef.current.scrollHeight + "px");
    setTextAreaHeight(textAreaRef.current.scrollHeight + "px");
  }, [text]);

  function changeHeight(e) {
    setTextAreaHeight("auto");
    setParentHeight(textAreaRef.current.scrollHeight + "px");
    setText(e.target.value);
  }

  return (
    <div style={parentStyle}>
      <textarea
        ref={textAreaRef}
        style={textAreaStyle}
        className="note-content"
        rows={props.rows}
        value={props.content}
        name="content"
        placeholder={props.inputArea ? "Take a note..." : null}
        onChange={(e) => {
          changeHeight(e);
          props.onChange(e);
        }}
        onClick={(e) => {
          props.onChange(e);
        }}
      />
    </div>
  );
}

export default AutoTextArea;
