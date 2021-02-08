import React, { Component } from "react";
import { BiHome } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Box, Container, Button, Icon, Flex, Spacer, Image } from "@chakra-ui/react"
import logo from "../logo.png";

class Nav extends Component {
  render() {
    return (
        <Box mb="6">
            <Container centerContent>
                <Image src={logo} w="44" alt="Twiddit." />
            </Container>
            <Flex mt="4">
                <Button size="3xs" bg="white" textStyle="h3" leftIcon={<Icon as={BiHome} w={5} h={5} />}>Home</Button>
                <Spacer />
                <Button size="3xs" bg="white" textStyle="h3" leftIcon={<Icon as={CgProfile} w={5} h={5} />}>Profile</Button>
            </Flex>
        </Box>
    );
    }
}

export default Nav;