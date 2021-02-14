import React, { Component } from "react";
import { VStack } from "@chakra-ui/react";
import Post from './Post';
import Write from './Write';
import Title from './Title';

class Feed extends Component {
  render() {
    return (
        <VStack w={["sm", "md", "lg", "xl", "2xl"]} ml="8" spacing={5} mt="24" mb="12">
            <Write />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </VStack>
    );
    }
}

export default Feed;