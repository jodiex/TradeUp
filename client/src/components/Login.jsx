import React, { Component } from "react";
import { Button, HStack } from "@chakra-ui/react";

class Login extends Component {
  render() {
    return (
        <HStack pos="fixed" top="3" right="3">
            <Button variant="secondary">Sign up</Button>
            <Button variant="loginButton">Log in</Button>
        </HStack>
    );
    }
}

export default Login;