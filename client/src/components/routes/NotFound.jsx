import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <p className="not-found">That page doesn't exist or is unavailable</p>
      <Link to={"/"} className="nav-link">
        Return to Home
      </Link>
    </div>
  );
}

export default NotFound;
