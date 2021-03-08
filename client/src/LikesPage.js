import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import LoginButtons from './components/LoginButtons';
import { Flex, Spacer } from "@chakra-ui/react"
import { connect } from "react-redux";
import PropTypes from "prop-types";


class LikesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.match.params.username,
    }
  }

  componentDidMount() {
    // if current authed user does not match username in params, redirect to home
    if (!this.props.auth.isAuthenticated || this.props.auth.user.username !== this.state.username) {
      this.props.history.push("/");
    }
  }

  componentDidUpdate() {
    // if current authed user does not match username in params, redirect to home
    if (!this.props.auth.isAuthenticated || this.props.auth.user.username !== this.state.username) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <Fragment>
        <Flex>
          <Spacer />
          <Sidebar isProfile={true} username={this.state.username}/>
          <Feed mode="likes" username={this.state.username}/>
          <Spacer />
        </Flex>
        <LoginButtons />
      </Fragment>
    );
  }
}

LikesPage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(withRouter(LikesPage));