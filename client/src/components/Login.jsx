import React, { useState } from "react";
import UserDataService from "../services/UserService";

function Login(props) {
  const [values, setValues] = useState({});

  function handleSubmit(e) {
    if (e) e.preventDefault();
    UserDataService.login(props.onLogin, values);
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
      <h1 className="form-title">Login</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="custom-form">
          <div>
            <label>Username: </label>
            <input
              autoComplete="off"
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
          <button type="submit" className="btn btn-warning">Login</button>
          <a href="/forgot" style={{float: "right", marginTop: "auto"}}>Forgot your password?</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
