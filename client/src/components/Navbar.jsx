import React from "react";
import UserDataService from "../services/UserService";
import { Link } from "react-router-dom";

function Navbar(props) {

  function handleLogout() {
    UserDataService.logout(props.onLogout)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      {/* Click on icon links to route */}
      <Link to={"/"} className="nav-link"><h1>Keeper</h1></Link>

      <ul className="navbar-nav navbar-right ml-auto">
        {/* Render login and signup if not auth and logout otherwise */}
        {!props.auth && (<Link to={"/login"} className="nav-link">Login</Link>)}
        {!props.auth && (<Link to={"/signup"} className="nav-link">Register</Link>)}
        {props.auth && (<div className="nav-link" style={{cursor:"pointer"}} onClick={handleLogout}>Logout</div>)}
      </ul>
    </nav>
  );
}

export default Navbar;
