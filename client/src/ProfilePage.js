import React, { Component, Fragment } from "react";
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import LoginButtons from './components/LoginButtons';
import { Flex, Spacer } from "@chakra-ui/react"
import { connect } from "react-redux";
import PropTypes from "prop-types";

class ProfilePage extends Component {
  render() {
    const username = this.props.match.params.username;
    const username2 = this.props.auth.username;

    return (
      <Fragment>
        <Flex>
          <Spacer />
          <Sidebar isProfile={true} username={username}/>
          <Feed mode={username === username2 ? "profile" : "user"}/>
          <Spacer />
        </Flex>
        <LoginButtons />
      </Fragment>
    );
  }
}

ProfilePage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProfilePage);