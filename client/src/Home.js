import React, { Component, Fragment } from "react";
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import LoginButtons from './components/LoginButtons';
import { Flex, Spacer } from "@chakra-ui/react"

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Flex>
          <Spacer />
          <Sidebar isProfile={false}/>
          <Feed mode="home"/>
          <Spacer />
        </Flex>
        <LoginButtons />
      </Fragment>
    );
  }
}

export default Home; 