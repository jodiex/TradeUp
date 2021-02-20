import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Box, Center, Input, Text, VStack, Button, InputGroup, InputRightElement } from "@chakra-ui/react"
import Logo from "./Logo";

const Login = () => {
  const height = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordClick = () => setShowPassword(!showPassword);

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
        <VStack spacing={8} mt="8">
          <Box w="100%">
            <Text textStyle="h3">Username</Text>
            <Input bg="white" borderRadius="lg" mt="2"/>
          </Box>
          <Box w="100%">
            <Text textStyle="h3">Password</Text>
            <InputGroup mt="2">
              <Input
                type={showPassword ? "text" : "password"}
              />
              <InputRightElement width="4.5em">
                <Button size="sm" onClick={handlePasswordClick}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
          <Button variant="secondary" w="3xs">Log in</Button>
          <Text textStyle="h4">Don't have an account? <Link to="/register">Register here</Link></Text>
        </VStack>
      </Box>
    </Center>
  );
}

export default Login;