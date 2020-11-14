import React from "react";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";

function Button(props) {
  switch (props.type) {
    case "add":
      // Render add button
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
          {!props.editable && (
            <button type="button" onClick={props.onEdit}>
              <EditIcon />
            </button>
          )}
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
        <button onClick={props.onDelete}>
          <DeleteIcon />
        </button>
      );
    case "cancel":
      // Render cancel button
      return (
        <button onClick={props.onCancel}>
          <CancelIcon />
        </button>
      );
    case "complete":
      // Render radio button with state based on props
      return (
        <div>
          {!props.complete && (
            <button type="button" onClick={props.toggleComplete}>
              <RadioButtonUncheckedIcon />
            </button>
          )}
          {props.complete && (
            <button type="button" onClick={props.toggleComplete}>
              <RadioButtonCheckedIcon />
            </button>
          )}
        </div>
      );
    default:
      console.log("no button informed");
  }
}

export default Button;
