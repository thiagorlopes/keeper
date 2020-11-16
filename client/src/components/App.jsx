import React, { useState, useLayoutEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import UserDataService from "../services/UserService";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Forgot from "./Forgot";
import Reset from "./Reset";
import NotFound from "./NotFound";
import Footer from "./Footer";

function App() {
  const [auth, setAuth] = useState(false);
  const [userId, setUserId] = useState(null);

  useLayoutEffect(() => {
    UserDataService.getCurrent(toggleAuth);
  }, []);

  function toggleAuth(isLoggedIn) {
    setAuth(isLoggedIn);
  }

  function handleLogin(currentUser) {
    if(currentUser.success) {
      setAuth(true);
      setUserId(currentUser.userId);
    } else {
      console.log("wrong username or password");
    }
  }

  function handleLogout(currentUser) {
    if(currentUser.success) {
      setAuth(false);
      setUserId(null);
    }
  }

  return (
    <Router>
      <Navbar auth={auth} onLogout={handleLogout} />
      {auth && <Redirect to="/" />}
      <Switch>
        <Route exact path="/" component={auth? () => <Home userId={userId} /> : () => <Login onLogin={handleLogin} />}/>
        {!auth && (<Route path="/login" component={() => <Login onLogin={handleLogin} />}/>)}
        {!auth && (<Route path="/signup" component={() => <Signup onLogin={handleLogin} />}/>)}
        {!auth && (<Route path="/forgot" component={() => <Forgot />}/>)}
        {!auth && (<Route path="/reset" component={() => <Reset />}/>)}
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
