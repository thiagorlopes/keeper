import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/SignUp";
import NotFound from "./routes/NotFound";
import Footer from "./Footer";

function App() {
  const [userLogged, setUserLogged] = useState(false);

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link to={"/"} className="nav-link">
            <h1>Keeper</h1>
          </Link>
          <ul className="navbar-nav navbar-right ml-auto">
            <li>
              <Link to={"/"} className="nav-link">
                {" "}
                Home{" "}
              </Link>
            </li>

            {/* Hides login and register links if user is not logged in*/}
            {!userLogged && (
              <li>
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            )}
            {!userLogged && (
              <li>
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li>
            )}

            {/* Show logout button if user is logged in */}
            {userLogged && (
              <li>
                <Link to={"/logout"} className="nav-link">
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={userLogged ? Home : Login} />
          {/* Allow redirect to Login and Register pages if not logged in*/}
          {!userLogged && <Route path="/login" component={Login} />}
          {!userLogged && <Route path="/register" component={Register} />}
          {/* Login and register routes redirect to home page if already logged in*/}
          {userLogged && <Route path="/login" component={Home} />}j
          {userLogged && <Route path="/register" component={Home} />}
          {/* Remaining unmatched routes redirect to NotFound component */}
          <Route component={NotFound} />
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
