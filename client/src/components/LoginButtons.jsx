import React, { Component, Fragment } from "react";
import { Button, HStack } from "@chakra-ui/react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import PropTypes from "prop-types";

class LoginButtons extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  onLoginClick = (e) => {
    e.preventDefault();
    this.props.history.push("/login");
  };

  onRegisterClick = (e) => {
    e.preventDefault();
    this.props.history.push("/register");
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <HStack pos="fixed" top="3" right="3">
        { !isAuthenticated ? 
          <Fragment>
            <Button variant="secondary" onClick={this.onRegisterClick}>Sign up</Button>
            <Button variant="loginButton" onClick={this.onLoginClick}>Log in</Button> 
          </Fragment>
          :
          <Button variant="loginButton" onClick={this.onLogoutClick}>Log out</Button>
        }
      </HStack>
    );
  }
}

LoginButtons.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(withRouter(LoginButtons));
