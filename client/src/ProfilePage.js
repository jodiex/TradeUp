import React, { Component, Fragment } from "react";
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import LoginButtons from './components/LoginButtons';
import { Flex, Spacer } from "@chakra-ui/react"

class ProfilePage extends Component {
  render() {
    const username = this.props.match.params.username;

    return (
      <Fragment>
        <Flex>
          <Spacer />
          <Sidebar isProfile={true} username={username}/>
          <Feed mode="user"/>
          <Spacer />
        </Flex>
        <LoginButtons />
      </Fragment>
    );
  }
}

export default ProfilePage; 