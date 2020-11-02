import React, { useState, useLayoutEffect } from "react";
import { Router, Route, Switch, useHistory } from "react-router-dom";
import UserDataService from "../services/UserService";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import NotFound from "./NotFound";
import Footer from "./Footer";

function App() {
  const [auth, setAuth] = useState(false);
  const [userId, setUserId] = useState(null);
  const history = useHistory("/");

  useLayoutEffect(() => {
    history.push("/");
    UserDataService.getCurrent(toggleAuth);
  }, []);

  function toggleAuth(isLoggedIn) {
    setAuth(isLoggedIn);
  }

  function handleLogin(currentUser) {
    if(currentUser.success) {
      setAuth(true);
      setUserId(currentUser.userId);
      history.push("/");
    }
  }

  function handleLogout(currentUser) {
    if(currentUser.success) {
      setAuth(false);
      setUserId(null);
      history.push("/login");
    }
  }

  return (
    <Router history={history}>
      <Navbar auth={auth} onLogout={handleLogout} />
      <Switch>
        {auth && <Route exact path="/" component={() => <Home userId={userId} />}/>}
        {!auth && (<Route path="/login" component={() => <Login onLogin={handleLogin} />}/>)}
        {!auth && (<Route path="/signup" component={() => <Signup onLogin={handleLogin} />}/>)}
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
