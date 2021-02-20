import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Center, Input, Text, VStack, Button, InputGroup, InputRightElement, FormControl, FormLabel } from "@chakra-ui/react"
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
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input type="text"/>
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input type="text"/>
          </FormControl>
          <FormControl id="password1">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword1 ? "text" : "password"}
              />
              <InputRightElement width="4.5em">
                <Button size="sm" onClick={handlePassword1Click}>
                  {showPassword1 ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="password2">
            <FormLabel>Confirm password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword2 ? "text" : "password"}
              />
              <InputRightElement width="4.5em">
                <Button size="sm" onClick={handlePassword2Click}>
                  {showPassword2 ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
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
      </Box>
    </Center>
  );
}

export default Register;