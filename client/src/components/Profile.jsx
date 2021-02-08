import React, { Component } from "react";
import './css/Profile.css';
import { MdPersonAdd, MdPersonOutline } from "react-icons/md";
import { CgAdd } from "react-icons/cg";
import { Box, Text, Container, Button, Icon, Image } from "@chakra-ui/react"



class Profile extends Component {
  render() {
    return (
        <Box w="2xs" pos="relative">
            <Container centerContent>
                <Image boxSize="10em" src="https://bit.ly/sage-adebayo" pos="absolute" borderRadius="full" />
            </Container>
            <Box
            bg="white"
            h="xs"
            borderRadius="3xl"
            pt="5em"
            mt="6em"
            >
                <Container centerContent px="6">
                    <Text textStyle="h3">John Smith</Text>
                    <Text textStyle="h4" mt="2">@username</Text>
                </Container>
                <Text textStyle="h6" mt="2" px="6">This is my bio.</Text>
                <Container centerContent pos="absolute" bottom="4">
                    <Button
                    bg="darkPurple"
                    color="white"
                    textStyle="h3"
                    leftIcon={<Icon as={MdPersonAdd} w={5} h={5} />}
                    _hover={{ bg: "#6371E8" }}
                    >
                        Follow
                    </Button>
                </Container>
            </Box>
        </Box>
    );
    }
}

export default Profile;