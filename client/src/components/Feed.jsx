import React, { Component } from "react";
import { VStack, Box, Text } from "@chakra-ui/react";
import Post from './Post';
import Write from './Write';
import Title from './Title';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateProfilePosts, updateLikes, updateLikedPosts, updateTrendingPosts, updateFeedPosts } from "../actions/feedActions";

const isEmpty = require("is-empty");

class Feed extends Component {
  componentDidMount() {
    if (this.props.mode === "profile" || this.props.mode === "user") {
      // set posts to profile posts
      this.props.updateProfilePosts(this.props.username);
    } else if (this.props.mode === "trending") {
      // set posts to trending posts
      this.props.updateTrendingPosts();
    }
    if (this.props.auth.isAuthenticated) {
      // update total liked posts
      this.props.updateLikes(!isEmpty(this.props.auth.user) ? this.props.auth.user.username : "");
      if (this.props.mode === "likes") {
        // set posts to only liked posts
        this.props.updateLikedPosts(this.props.username);
      } else if (this.props.mode === "feed") {
        this.props.updateFeedPosts(!isEmpty(this.props.auth.user) ? this.props.auth.user.username : "");
      }
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
          {this.props.mode === "trending" &&
            <Title text="Trending Posts" />}
          {this.props.mode === "likes" &&
            <Title text="Likes" />}
          <Box w={["xs", "md", "lg", "xl", "2xl"]}>
            {posts.length > 0 ?
              posts.map((post) => 
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
              )
              :
              <Text>No posts yet. Follow a user to get started!</Text>
            }
          </Box>
        </VStack>
    );
    }
}


Feed.propTypes = {
  updateProfilePosts: PropTypes.func.isRequired,
  updateLikes: PropTypes.func.isRequired,
  updateLikedPosts: PropTypes.func.isRequired,
  updateTrendingPosts: PropTypes.func.isRequired,
  updateFeedPosts: PropTypes.func.isRequired,
  feed: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    feed: state.feed,
    auth: state.auth
  };
};

export default connect(mapStateToProps, { updateProfilePosts, updateLikes, updateLikedPosts, updateTrendingPosts, updateFeedPosts })(Feed);