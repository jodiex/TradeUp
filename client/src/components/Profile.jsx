import React, { Component } from "react";
import { MdPersonAdd } from "react-icons/md";
import { Box, Text, Container, Button, Icon, Image } from "@chakra-ui/react"

class Profile extends Component {
  render() {
    return (
        <Box w="2xs" pos="relative" mb="4">
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
                <Text textStyle="h5" mt="2" px="6">This is my bio.</Text>
                <Container centerContent pos="absolute" bottom="4">
                    <Button
                    variant="secondary"
                    textStyle="h3"
                    leftIcon={<Icon as={MdPersonAdd} w={5} h={5} />}
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