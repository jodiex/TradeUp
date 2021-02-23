import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Box, Center, Input, Text, VStack, Button, InputGroup, InputRightElement, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react"
import Logo from "./Logo";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      username: "",
      email: "",
      password1: "",
      password2: "",
      errors: {},
      showPassword1: false,
      showPassword2: false
    };
  }

  componentDidMount() {
    // if logged in, redirect to home
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password1: this.state.password1,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history); 
  };

  handlePassword1Visibility = () => this.setState({ showPassword1: !this.state.showPassword1 });
  handlePassword2Visibility = () => this.setState({ showPassword2: !this.state.showPassword2 })

  render() {
    const { errors } = this.state;
    const height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

    return (
      <Center h={height}>
        <Box
        bg="white"
        w={["sm", null, "md", "lg", null]}
        borderRadius="2xl"
        py="8"
        px="12"
        >
          <Logo />
          <form onSubmit={this.handleSubmit}>
            <VStack spacing={6} mt="6">
              <FormControl isInvalid={errors.name}>
                <FormLabel>Name</FormLabel>
                <Input id="name" type="text" onChange={this.onChange}/>
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input id="email" type="email" onChange={this.onChange}/>
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.username}>
                <FormLabel>Username</FormLabel>
                <Input id="username" type="text" onChange={this.onChange}/>
                <FormErrorMessage>{errors.username}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password1}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password1"
                    type={this.state.showPassword1 ? "text" : "password"}
                    onChange={this.onChange}
                  />
                  <InputRightElement width="4.5em">
                    <Button size="sm" onClick={this.handlePassword1Visibility}>
                      {this.state.showPassword1 ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password1}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password2}>
                <FormLabel>Confirm password</FormLabel>
                <InputGroup>
                  <Input
                    id="password2"
                    type={this.state.showPassword2 ? "text" : "password"}
                    onChange={this.onChange}
                  />
                  <InputRightElement width="4.5em">
                    <Button size="sm" onClick={this.handlePassword2Visibility}>
                      {this.state.showPassword2 ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password2}</FormErrorMessage>
              </FormControl>
              <Button
                variant="secondary"
                w="3xs"
                type="submit"
              >
                Sign up
              </Button>
              <Text textStyle="h4">Already have an account? <Link to="/login">Login here</Link></Text>
            </VStack>
          </form>
        </Box>
      </Center>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
