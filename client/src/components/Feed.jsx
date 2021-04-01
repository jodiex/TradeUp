import React, { Component } from "react";
import { VStack, Box, Text, Spacer, Flex, Button, Icon } from "@chakra-ui/react";
import { MdPersonAdd, MdRemoveCircle } from "react-icons/md";
import Post from './Post';
import Write from './Write';
import Title from './Title';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateProfilePosts,
  updateLikes,
  updateLikedPosts,
  updateTrendingPosts,
  updateFeedPosts,
  updateCommunityPosts,
  updateCommunities
} from "../actions/feedActions";
import axios from "axios";

const isEmpty = require("is-empty");

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowing: false
    }
  }

  componentDidMount() {
    if (this.props.mode === "profile" || this.props.mode === "user") {
      // set posts to profile posts
      this.props.updateProfilePosts(this.props.username);
    } else if (this.props.mode === "trending") {
      // set posts to trending posts
      this.props.updateTrendingPosts();
    } else if (this.props.mode === "community") {
      // set posts to community posts
      this.props.updateCommunityPosts(this.props.community);
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

  // follow community
  onFollowClick = (e) => {
    e.preventDefault();
    if (!this.props.auth.isAuthenticated) {
      // redirect to login if not authed
      window.location.href = "/login";
    } else {
      if (this.props.auth.user) {
        // add new follow to db
        const followBody = {
          follower: this.props.auth.user.id,
          date: new Date()
        };
        axios
          .post("/api/communities/follow/" + this.props.community, followBody)
          .then(res => {
            this.setState({ isFollowing: true });
            // update joined communities in redux
            this.updateCommunities(this.props.auth.user.username);
          })
          .catch(err => console.log(err));
      }
    }
  };

  // unfollow community
  onUnfollowClick = (e) => {
    e.preventDefault();
    if (!this.props.auth.isAuthenticated) {
      // redirect to login if not authed
      window.location.href = "/login";
    } else {
      // delete follow
      axios
        .delete("/api/communities/follow/" + this.props.community, { params: { follower: this.props.auth.user.id } })
        .then(res => {
          this.setState({ isFollowing: false });
          // update joined communities in redux
          this.updateCommunities(this.props.auth.user.username);
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const { posts, likes } = this.props.feed;
    return (
        <VStack ml="8" spacing={5} mt={24} mb={7}>
          {this.props.mode === "profile" &&
            <Write />}
          {this.props.mode === "feed" &&
            <Title text="Your Feed" />}
          {this.props.mode === "user" &&
            <Title text={"Posts: " + this.props.username}/>}
          {this.props.mode === "trending" &&
            <Title text="Trending Posts" />}
          {this.props.mode === "likes" &&
            <Title text="Likes" />}
          {this.props.mode === "community" &&
            <Flex w={["xs", "md", "lg", "xl", "2xl"]}>
              <Title text={"Posts: " + this.props.community} />
              <Spacer/>
              <Button
                variant={this.state.isFollowing ? "outline" : "secondary"}
                textStyle="h2"
                leftIcon={<Icon as={this.state.isFollowing ? MdRemoveCircle : MdPersonAdd} w={5} h={5} />}
                w="xs"
                size="sm"
                onClick={this.state.isFollowing ? this.onUnfollowClick : this.onFollowClick }
                >
                {this.state.isFollowing ? "Unfollow Community" : "Join Community"}
              </Button>
            </Flex>}
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
              <Text>No posts in your feed yet. Follow a user to get started!</Text>
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
  updateCommunityPosts: PropTypes.func.isRequired,
  updateCommunities: PropTypes.func.isRequired,
  feed: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    feed: state.feed,
    auth: state.auth
  };
};

export default connect(mapStateToProps, { updateProfilePosts, updateLikes, updateLikedPosts, updateTrendingPosts, updateFeedPosts, updateCommunityPosts, updateCommunities })(Feed);