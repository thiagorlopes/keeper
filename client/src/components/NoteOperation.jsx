import React from "react";

function NoteOperation(props) {
  switch (props.operation) {
    case "add":
      console.log("add");
      break;
    case "update":
      console.log("update");
      break;
    case "delete":
      console.log("delete");
      break;
    default:
      console.log("Please specify the operation.");
  }
}

export default NoteOperation;
