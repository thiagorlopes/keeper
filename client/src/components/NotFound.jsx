import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <p>That page doesn't exist or is unavailable</p>
      <Link to={"/"} className="nav-link">
        Return Home
      </Link>
    </div>
  );
}

export default NotFound;
