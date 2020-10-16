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
              <div className="left-sidebar">
                <Nav />
                <Communities />
              </div>
            </div>
            <div className="col-6">
              <div className="posts">
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
              </div>
            </div>
            <div className="col-3">
              <div className="right-sidebar">
                <Profile />
              </div>
            </div>
          </div>
      </Router>
      
    );
  }
}

export default App; 