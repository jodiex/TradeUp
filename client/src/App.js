import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';
import ProfilePage from './ProfilePage';
import LikesPage from './LikesPage';
import Login from './components/Login';
import Register from './components/Register';
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { PersistGate } from 'redux-persist/integration/react'

// check for token to keep user logged in
if (localStorage.jwtToken) {
  // set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // decode token and get user info and exp
  const decoded = jwt_decode(token);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000; // in milliseconds
  if (decoded.exp < currentTime) {
    // expired user so logout user
    store.dispatch(logoutUser(null));
  }
} else {
  // jwtToken does not exist so log out user
  store.dispatch(logoutUser(null));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/user/:username" exact component={ProfilePage} />
            <Route path="/user/:username/likes" exact component={LikesPage} />
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App; 