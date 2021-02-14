import React, { Component } from "react";
import { ImPlus } from "react-icons/im";
import { MdPeople } from "react-icons/md";
import { Box, Text, Container, IconButton, Icon, Flex, Spacer } from "@chakra-ui/react"

class Communities extends Component {
  render() {
    return (
        <Box w="2xs"
        bg="white"
        h="sm"
        borderRadius="3xl"
        >
            <Container p="4">
                <Text textStyle="h3">Popular Communities&ensp;<Icon as={MdPeople} w={5} h={5} /></Text>
                <Flex mt="2">
                    <Text textStyle="h5"># The Walking Dead</Text>
                    <Spacer />
                    <IconButton aria-label="Join Community" variant="secondary" size="xs" icon={<ImPlus />}/>
                </Flex>
            </Container>
        </Box>
    );
    }
}

export default Communities;