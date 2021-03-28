import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import LoginButtons from './components/LoginButtons';
import { Flex, Spacer } from "@chakra-ui/react"
import { connect } from "react-redux";
import PropTypes from "prop-types";


class CommunityPage extends Component {
  render() {
    const name = this.props.match.params.name;

    return (
      <Fragment>
        <Flex>
          <Spacer />
          <Sidebar isProfile={false} username=""/>
          <Feed mode="community" username="" community={name}/>
          <Spacer />
        </Flex>
        <LoginButtons />
      </Fragment>
    );
  }
}

CommunityPage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(withRouter(CommunityPage));