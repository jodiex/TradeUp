import React, { Component, Fragment } from "react";
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import LoginButtons from './components/LoginButtons';
import { Flex, Spacer } from "@chakra-ui/react"
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Flex>
          <Spacer />
          <Sidebar isProfile={false}/>
          <Feed mode={this.props.auth.isAuthenticated ? "feed" : "trending"}/>
          <Spacer />
        </Flex>
        <LoginButtons />
      </Fragment>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Home);