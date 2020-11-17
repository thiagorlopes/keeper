import React, { useState } from "react";
import UserDataService from "../services/UserService";
import useForm from "./helpers/useForm";
import validate from "./helpers/ForgotFormValidationRules";

function Forgot() {
  const [response, setResponse] = useState({});

  // Third argument is reserved for checking uniqueness of username and email on SignUp
  const { values, errors, handleChange, handleSubmit } = useForm(
    forgotPassword,
    validate,
    null
  );

  function forgotPassword() {
    return UserDataService.forgot(renderMessage, values);
  }

  function renderMessage(res) {
    setResponse(() => {
      return {
        success: res.success,
        message: res.message,
      };
    });
  }

  // Render Forgot page
  return (
    <div>
      <h1 className="form-title">Forgot Password</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="custom-form">
          {!response.success && (
            <div>
              <label>Email:</label>
              <input
                className="form-control"
                type="text"
                name="email"
                onChange={handleChange}
              />
              {errors.email && <p style={{ color: "#bb2124" }}>{errors.email}</p>}
              <button type="submit" className="btn btn-warning">
                Send reset instructions
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

export default Forgot;
