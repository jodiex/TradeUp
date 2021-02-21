import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Box, Center, Input, Text, VStack, Button, InputGroup, InputRightElement, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react"
import Logo from "./Logo";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {},
      showPassword: false
    };
  }

  componentDidMount() {
    // if logged in, redirect to home
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/"); // push user to homepage when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };

  handlePasswordVisibilty = () => setState({ showPassword: !showPassword });

  render() {
    const { errors } = this.state;
    const height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

    return (
      <Center h={height}>
        <Box
        bg="white"
        h="md"
        w={["sm", null, "md", "lg", null]}
        borderRadius="2xl"
        py="10"
        px="12"
        >
          <Logo />
          <form onSubmit={this.handleSubmit}>
            <VStack spacing={8} mt="8">
              <FormControl isInvalid={errors.username}>
                <FormLabel>Username</FormLabel>
                <Input id="username" type="text" onChange={this.onChange}/>
                <FormErrorMessage>{errors.username}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    type={this.state.showPassword ? "text" : "password"}
                    onChange={this.onChange}
                  />
                  <InputRightElement width="4.5em">
                    <Button size="sm" onClick={this.handlePasswordVisibilty}>
                      {this.state.showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.passsword}</FormErrorMessage>
              </FormControl>
              <Button
                variant="secondary"
                w="3xs"
                type="submit"
              >
                Log in
              </Button>
              <Text textStyle="h4">Don't have an account? <Link to="/register">Register here</Link></Text>
            </VStack>
          </form>
        </Box>
      </Center>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
