import React, { Component } from "react";
import { VStack, Box } from "@chakra-ui/react";
import axios from "axios";
import Post from './Post';
import Write from './Write';
import Title from './Title';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      posts: []
    };
  }

  componentDidMount() {
    if (this.props.mode === "profile" || this.props.mode === "user") {
      axios
        .get("/api/posts/" + this.props.username)
        .then(res => {
          this.setState({
            name: res.data.name,
            posts: res.data.posts
          })
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  render() {
    return (
        <VStack ml="8" spacing={5} mt={24} mb={7}>
          {this.props.mode === "profile" &&
            <Write username={this.props.username}/>}
          {this.props.mode === "feed" &&
            <Title text="Your Feed" />}
          {this.props.mode === "user" &&
            <Title text="Posts" />}
          {this.props.mode === "home" &&
            <Title text="Trending Posts" />}
          <Box w={["sm", "md", "lg", "xl", "2xl"]}>
            {this.state.posts.map((post) => 
              <Post key={post._id} name={this.state.name} username={post.username} tag={post.tag} text={post.text} date={post.date}/>
            )}
          </Box>
        </VStack>
    );
    }
}

export default Feed;