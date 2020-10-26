import React from "react";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

function Button(props) {
  switch (props.type) {
    case "add":
      // Render add button in InputArea.jsx
      return (
        <div>
          <button
            type="button"
            className={props.className}
            onClick={props.onAdd}
          >
            <AddIcon />
          </button>
        </div>
      );
    case "edit":
      // Render edit button if note is not editable or confirmation button otherwise
      return (
        <div>
          {/* Calls onEdit in Note.jsx when clicked */}
          {!props.editable && (
            <button type="button" onClick={props.onEdit}>
              <EditIcon />
            </button>
          )}

          {/* Calls onSubmit in Note.jsx when clicked */}
          {props.editable && (
            <button type="button" onClick={props.onSubmit}>
              <CheckCircleIcon />
            </button>
          )}
        </div>
      );
    case "delete":
      // Render delete button in Note.jsx
      return (
        <div>
          <button onClick={props.onDelete}>
            <DeleteIcon />
          </button>
        </div>
      );
    case "cancel":
      // Render cancel button in Note.jsx
      return (
        <button onClick={props.onCancel}>
          <CancelIcon />
        </button>
      );
    default:
      console.log("no button informed");
  }
}

export default Button;
