import React, { Component } from "react";
import { Box, Text, Container, Button, Icon, Image } from "@chakra-ui/react";
import Post from './Post';

class Feed extends Component {
  render() {
    return (
        <Box w={["lg", null, "xl", null, "2xl"]} ml="8">
            <Post />
        </Box>
    );
    }
}

export default Feed;