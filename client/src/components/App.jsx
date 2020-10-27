import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import NotFound from "./routes/NotFound";
import Footer from "./Footer";

function App() {
  const [authenticated, setAuthenticated] = useState(true);
  const [userId, setUserId] = useState(0);

  function handleLogin(id) {
    setAuthenticated(true);
    setUserId(id);
  }

  function handleLogout() {
    setAuthenticated(false);
  }

  return (
    <Router>
        <Navbar authenticated={authenticated} onLogout={handleLogout} />
          <Route exact path="/" component={authenticated ? Home : Login} />
          {!authenticated && <Route path="/login" component={Login} onLogin={handleLogin} />}
          {!authenticated  && <Route path="/signup" component={Signup} onLogin={handleLogin} />}
          <Route component={NotFound} />
        <Footer />
    </Router>
  );
}

export default App;
