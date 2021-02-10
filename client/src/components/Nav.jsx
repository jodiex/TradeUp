import React, { Component } from "react";
import { BiHome } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import Logo from './Logo';
import { Box, Button, Icon, Flex, Spacer } from "@chakra-ui/react";

class Nav extends Component {
  render() {
    return (
        <Box mb="6">
            <Logo />
            <Flex mt="4">
                <Button variant="navButton" leftIcon={<Icon as={BiHome} w={5} h={5} />}>Home</Button>
                <Spacer />
                <Button variant="navButton" leftIcon={<Icon as={CgProfile} w={5} h={5} />}>Profile</Button>
            </Flex>
        </Box>
    );
    }
}

export default Nav;