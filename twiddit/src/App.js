import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from './components/NavBar.jsx';
import Profile from './components/Profile.jsx';
import Nav from './components/Nav.jsx';
import Communities from './components/Communities.jsx';
import Post from './components/Post.jsx';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar/>
          <div className="row">
            <div className="col-3">
              <Nav />
              <Communities />
            </div>
            <div className="col-3">
              <Profile />
            </div>
            <div className="col-6">
              <Post />
            </div>
          </div>
      </Router>
      
    );
  }
}

export default App; 