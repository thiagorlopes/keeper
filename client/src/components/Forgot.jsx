import React, { useState } from "react";
import UserDataService from "../services/UserService";

function Forgot() {
  const [values, setValues] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState({});

  function handleSubmit(e) {
    if (e) e.preventDefault();
    if (!isSubmitting) {
      setIsSubmitting(false);
      UserDataService.forgot(values, renderMessage);
    }
  }

  function renderMessage(res) {
    setResponse(() => {
      return {
        success: res.success,
        message: res.message
      };
    });
    setIsSubmitting(false);
  }

  function handleChange(e) {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  }

  // Render Login page
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
                required
              />
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
