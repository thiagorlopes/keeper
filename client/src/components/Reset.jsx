import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UserDataService from "../services/UserService";
import useForm from "./helpers/useForm";
import validate from "./helpers/ResetFormValidationRules";

function Reset() {
  const [response, setResponse] = useState({});

  // Third argument is reserved for checking uniqueness of username and email on SignUp
  const { values, errors, handleChange, handleSubmit } = useForm(
    resetPassword,
    validate,
    null
  );

  const params = useParams();

  function resetPassword() {
    return UserDataService.reset(renderMessage, values, params.token);
  }

  function renderMessage(res) {
    setResponse(() => {
      return {
        render: res.render,
        message: res.message,
      };
    });
  }

  // Render Reset page
  return (
    <div>
      <h1 className="form-title">Reset Password</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="custom-form">
          {!response.render && (
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
          {response.render && (
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
