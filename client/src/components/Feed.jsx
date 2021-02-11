import React, { Component } from "react";
import { VStack } from "@chakra-ui/react";
import Post from './Post';
import Write from './Write';

class Feed extends Component {
  render() {
    return (
        <VStack w={["lg", null, "xl", null, "2xl"]} ml="8" spacing={6}>
            <Write />
            <Post />
            <Post />
        </VStack>
    );
    }
}

export default Feed;