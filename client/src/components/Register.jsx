import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Box, Center, Input, Text, VStack, Button, InputGroup, InputRightElement } from "@chakra-ui/react"
import Logo from "./Logo";

const Register = () => {
  const height = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

  const [showPassword1, setShowPassword1] = useState(false);
  const handlePassword1Click = () => setShowPassword1(!showPassword1);
  const [showPassword2, setShowPassword2] = useState(false);
  const handlePassword2Click = () => setShowPassword2(!showPassword2);

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
        <VStack spacing={6} mt="6">
          <Box w="100%">
            <Text textStyle="h3">Name</Text>
            <Input borderRadius="lg" mt="2"/>
          </Box>
          <Box w="100%">
            <Text textStyle="h3">Email</Text>
            <Input borderRadius="lg" mt="2"/>
          </Box>
          <Box w="100%">
            <Text textStyle="h3">Username</Text>
            <Input borderRadius="lg" mt="2"/>
          </Box>
          <Box w="100%">
            <Text textStyle="h3">Password</Text>
            <InputGroup mt="2">
              <Input
                type={showPassword1 ? "text" : "password"}
              />
              <InputRightElement width="4.5em">
                <Button size="sm" onClick={handlePassword1Click}>
                  {showPassword1 ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box w="100%">
            <Text textStyle="h3">Confirm password</Text>
            <InputGroup mt="2">
              <Input
                type={showPassword2 ? "text" : "password"}
              />
              <InputRightElement width="4.5em">
                <Button size="sm" onClick={handlePassword2Click}>
                  {showPassword2 ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
          <Button variant="secondary" w="3xs">Sign up</Button>
          <Text textStyle="h4">Already have an account? <Link to="/login">Login here</Link></Text>
        </VStack>
      </Box>
    </Center>
  );
}

export default Register;