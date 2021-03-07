import React, { Component } from "react";
import { VStack, Box } from "@chakra-ui/react";
import Post from './Post';
import Write from './Write';
import Title from './Title';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updatePosts, updateLikes } from "../actions/feedActions";

const isEmpty = require("is-empty");

class Feed extends Component {
  componentDidMount() {
    if (this.props.mode === "profile" || this.props.mode === "user") {
      this.props.updatePosts(this.props.username);
    }
    if (this.props.auth.isAuthenticated) {
      this.props.updateLikes(!isEmpty(this.props.auth.user) ? this.props.auth.user.username : "");
    }
  }

  render() {
    const { posts, likes } = this.props.feed;
    return (
        <VStack ml="8" spacing={5} mt={24} mb={7}>
          {this.props.mode === "profile" &&
            <Write />}
          {this.props.mode === "feed" &&
            <Title text="Your Feed" />}
          {this.props.mode === "user" &&
            <Title text="Posts" />}
          {this.props.mode === "home" &&
            <Title text="Trending Posts" />}
          <Box w={["xs", "md", "lg", "xl", "2xl"]}>
            {posts.map((post) => 
              <Post
                key={post._id}
                id={post._id}
                authorName={post.authorName}
                author={post.author}
                tag={post.tag}
                text={post.text}
                date={post.date}
                reshared={post.reshared}
                liked={likes.includes(post._id)}
              />
            )}
          </Box>
        </VStack>
    );
    }
}


Feed.propTypes = {
  updatePosts: PropTypes.func.isRequired,
  updateLikes: PropTypes.func.isRequired,
  feed: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    feed: state.feed,
    auth: state.auth
  };
};

export default connect(mapStateToProps, { updatePosts, updateLikes })(Feed);