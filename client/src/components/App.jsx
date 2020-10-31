import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import NotFound from "./routes/NotFound";
import Footer from "./Footer";

function App() {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState(null);

  function handleLogin(currentUser) {
    if(currentUser.success) {
      setAuth(true);
      setUsername(currentUser);
    }
  }

  function handleLogout(currentUser) {
    if(currentUser.success) {
      setAuth(false);
      setUsername(null);
    }
  }

  return (
    <Router>
      <Navbar auth={auth} onLogout={handleLogout} />
      {auth && <Redirect to="/" />}
      <Switch>
        <Route exact path="/" component={auth? () => <Home currentUser={username} /> : () => <Login onLogin={handleLogin} />}/>
        {!auth && (<Route path="/login" component={() => <Login onLogin={handleLogin} />}/>)}
        {!auth && (<Route path="/signup" component={() => <Signup onLogin={handleLogin} />}/>)}
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
