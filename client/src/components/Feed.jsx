import React, { Component } from "react";
import { VStack, Box } from "@chakra-ui/react";
import Post from './Post';
import Write from './Write';
import Title from './Title';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../actions/feedActions";

class Feed extends Component {
  componentDidMount() {
    console.log("hello")
    if (this.props.mode === "profile" || this.props.mode === "user") {
      this.props.getPosts(this.props.username);
    }
  }

  render() {
    const { posts } = this.props.feed;
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
          <Box w={["xs", "md", "lg", "xl", "2xl"]}>
            {posts.map((post) => 
              <Post key={post._id} name={post.name} username={post.username} tag={post.tag} text={post.text} date={post.date}/>
            )}
          </Box>
        </VStack>
    );
    }
}


Feed.propTypes = {
  getPosts: PropTypes.func.isRequired,
  feed: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    feed: state.feed
  };
};

export default connect(mapStateToProps, { getPosts })(Feed);