import React, { Component } from "react";
import { CgHeart } from "react-icons/cg";
import { AiOutlineRetweet } from "react-icons/ai";
import { Box, Text, Button, HStack, IconButton } from "@chakra-ui/react";

class Post extends Component {
  render() {
    return (
        <Box h={["9em", null, "9em", null, "8em"]} bg="white" borderRadius="xl" py="3" px="4" pos="relative">
            <HStack>
                <Text textStyle="h3">John Smith</Text>
                <Text textStyle="h4">@username</Text>
                <Button
                variant="secondary"
                textStyle="h7"
                size="xs">
                    # The Walking Dead
                </Button>
            </HStack>
            <Text textStyle="h6" mt="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
            <HStack pos="absolute" bottom="3" left="1">
                <IconButton aria-label="Retweet" variant="link" icon={<AiOutlineRetweet />}/>
                <IconButton aria-label="Like" variant="link" icon={<CgHeart />}/>
                <Text textStyle="h6" pl="1">4:11pm&emsp;Sept 24</Text>
            </HStack>
        </Box>
    );
    }
}

export default Post;