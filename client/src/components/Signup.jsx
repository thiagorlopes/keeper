import React from "react";
import UserDataService from "../services/UserService";
import useForm from "./helpers/useForm";
import validate from "./helpers/SignupFormValidationRules";

function SignUp(props) {
  const { values, errors, handleChange, handleSubmit } = useForm(
    createUser,
    validate
  );

  function createUser() {
    UserDataService.signup(props.onLogin, values);
    console.log("No validations errors, called signup.");
  }

  // Render Signup page
  return (
    <div>
      <h1 className="form-title">Signup</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="custom-form">
          <div>
            <label>Username: </label>
            <input
              autoComplete="off"
              className={`form-control ${errors.username && "is-danger"}`}
              type="text"
              name="username"
              onChange={handleChange}
            />
            {errors.username && (<p style={{ color: "#bb2124" }}>{errors.username}</p>)}
          </div>
          <div>
            <label>Email: </label>
            <input
              className={`form-control ${errors.email && "is-danger"}`}
              type="email"
              name="email"
              onChange={handleChange}
            />
            {errors.email && <p style={{ color: "#bb2124" }}>{errors.email}</p>}
          </div>
          <div>
            <label>Password</label>
            <input
              className={`form-control ${errors.password && "is-danger"}`}
              type="password"
              name="password"
              onChange={handleChange}
            />
            {errors.password && (<p style={{ color: "#bb2124" }}>{errors.password}</p>)}
          </div>
          <div>
            <label>Re-enter Password</label>
            <input
              className={`form-control ${errors.password && "is-danger"}`}
              type="password"
              name="password2"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-warning">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
