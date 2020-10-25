import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./NotFound";
import Footer from "./Footer";

function App() {
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
            <li>
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li>
              <Link to={"/register"} className="nav-link">
                Register
              </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={NotFound} />
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
