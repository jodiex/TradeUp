import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from './components/NavBar.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <NavBar/>
          <h2>Twiddit</h2>
        </div>
      </Router>
      
    );
  }
}

export default App;