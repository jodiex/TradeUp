import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import Logo from './Logo';
import { Box, Button, Icon, Flex, Spacer } from "@chakra-ui/react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Nav extends Component {
  onHomeClick = (e) => {
    e.preventDefault();
    this.props.history.push("/");
  }

  onProfileClick = (e) => {
    e.preventDefault();
    const { user, isAuthenticated } = this.props.auth;
    if (isAuthenticated && user !== {}) {
      this.props.history.push("/user/" + user.username);
    } else {
      // if not logged in, profile should take them to login screen
      this.props.history.push("/login");
    }
  }

  render() {
    return (
        <Box mb="6">
            <Logo />
            <Flex mt="4">
                <Button
                variant="navButton"
                leftIcon={<Icon as={BiHome} w={5} h={5} />}
                onClick={this.onHomeClick}>
                  Home
                </Button>
                <Spacer />
                <Button
                variant="navButton"
                leftIcon={<Icon as={CgProfile} w={5} h={5} />}
                onClick={this.onProfileClick}>
                  Profile
                </Button>
            </Flex>
        </Box>
    );
    }
}

Nav.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(withRouter(Nav));
