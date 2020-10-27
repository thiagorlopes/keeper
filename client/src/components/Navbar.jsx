import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      {/* Click on icon routes to home */}
      <Link to={"/"} className="nav-link">
        <h1>Keeper</h1>
      </Link>

      <ul className="navbar-nav navbar-right ml-auto">
        <Link to={"/"} className="nav-link">
          Home
        </Link>

        {/* Render login or signup links if not authenticated */}
        {!props.authenticated && (
          <Link to={"/login"} className="nav-link">
            Login
          </Link>
        )}
        {!props.authenticated && (
          <Link to={"/signup"} className="nav-link">
            Register
          </Link>
        )}

        {/* Logout by clicking if authenticated */}
        {props.authenticated && (
          <Link to={"/"} className="nav-link" onClick={props.onLogout}>
            Logout
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
