import React, { Component } from "react";
import { Grid, Segment, Header, Dropdown, Label, Divider, Button, Icon, Input} from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from './components/NavBar.jsx';

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar/>
        <div className="container">
          <div className="col-3">
            <Button.Group vertical widths='5'>
              <Button id='home' fluid>
                  Home
              </Button>
              <Button id='profile' fluid>
                  Profile
              </Button>
              <Button id='likes' fluid>
                  Likes
              </Button>
            </Button.Group>
          </div>
        </div>
      </Router>
      
    );
  }
}

export default App; 