import React, { useState } from "react";

function Login() {
  const [input, setInput] = useState({});

  function handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
  }

  function handleChange(e) {
    e.persist();
    setInput((input) => ({
      ...input,
      [e.target.name]: e.target.value,
    }));
  }

  // Render Login page
  return (
    <div>
      <h1 className="form-title">Login</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="custom-form">
          <div>
            <label>Username: </label>
            <input
              className="form-control"
              type="text"
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-warning">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
