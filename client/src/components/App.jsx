import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import NotFound from "./routes/NotFound";
import Footer from "./Footer";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState(0);
  const history = useHistory();

  function handleLogin(id) {
    setAuthenticated(true);
    setUserId(id);
    history.push("/");
  }

  function handleLogout() {
    setAuthenticated(false);
    setUserId(null);
    return <Redirect to="/" push={true} />
  }

  return (
    <Router>
        <Navbar authenticated={authenticated} onLogout={handleLogout} />
        <Switch >
          <Route exact path="/" component={authenticated ? Home : () => (<Login onLogin={handleLogin}/>)} />
          {!authenticated && <Route path="/login" component={() => (<Login onLogin={handleLogin}/>)} />}
          {!authenticated  && <Route path="/signup" component={() => (<Signup onLogin={handleLogin}/>)} />}
          <Route component={NotFound} />
          </Switch>
        <Footer />
    </Router>
  );
}

export default App;
