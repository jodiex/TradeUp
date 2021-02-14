import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Login from './components/Login';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Flex, Spacer } from "@chakra-ui/react"

class App extends Component {
  render() {
    return (
      <Router>
        <Flex>
          <Spacer />
          <Sidebar />
          <Feed />
          <Spacer />
        </Flex>
        <Login />
      </Router>
      
    );
  }
}

export default App; 