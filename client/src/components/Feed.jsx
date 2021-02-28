import React, { Component } from "react";
import { VStack } from "@chakra-ui/react";
import Post from './Post';
import Write from './Write';
import Title from './Title';

class Feed extends Component {
  render() {
    return (
        <VStack w={["sm", "md", "lg", "xl", "2xl"]} ml="8" spacing={5} mt="24" mb="12">
          {this.props.mode === "profile" &&
            <Write username={this.props.username}/>}
          {this.props.mode === "feed" &&
            <Title text="Your Feed" />}
          {this.props.mode === "user" &&
            <Title text="Posts" />}
          {this.props.mode === "home" &&
            <Title text="Trending Posts" />}
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