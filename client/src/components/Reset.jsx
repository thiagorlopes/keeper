import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UserDataService from "../services/UserService";
import useForm from "./helpers/useForm";
import validate from "./helpers/ResetFormValidationRules";

function Reset() {
  const [response, setResponse] = useState({});
  const [validation, setValidation] = useState({});

  const { values, errors, handleChange, handleSubmit } = useForm(
    resetPassword,
    validate,
    validation
  );

  const params = useParams();

  function resetPassword() {
    return UserDataService.reset(renderMessage, values, params.token);
  }

  function renderMessage() {}

  // Render Reset page
  return (
    <div>
      <h1 className="form-title">Reset Password</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="custom-form">
          {!response.success && (
            <div>
              <label>New Password:</label>
              <input
                autoComplete="off"
                className={`form-control ${errors.password && "is-danger"}`}
                type="password"
                name="password"
                onChange={handleChange}
              />
              {errors.password && (<p style={{ color: "#bb2124" }}>{errors.password}</p>)}
              <label>Confirm Password:</label>
              <input
                className={`form-control ${errors.password && "is-danger"}`}
                type="password"
                name="password2"
                onChange={handleChange}
              />
              <button type="submit" className="btn btn-warning">
                Update Password
              </button>
            </div>
          )}
          {response.success && (
            <div>
              <p>{response.message}</p>
              <a href="/">Return</a>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Reset;
