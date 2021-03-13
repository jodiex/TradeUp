import React, { Component, Fragment } from "react";
import { MdPersonOutline } from "react-icons/md";
import { CgAdd, CgHeart } from "react-icons/cg";
import {
  Stack,
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton, 
  Divider,
  ModalFooter,
  Flex,
  Spacer,
  Avatar,
  Link
} from "@chakra-ui/react"
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";

const isEmpty = require("is-empty");

class ProfileStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      openModal: false,
      numLikes: 0,
      following: [],
      followers: [],
      isFollowingModal: true
    }
  }

  componentDidMount() {
    const username2 = !isEmpty(this.props.auth.user) ? this.props.auth.user.username : "";
    const isAuthenticated = this.props.auth.isAuthenticated;
    const isAuthedUser = isAuthenticated && (this.state.username === username2);
    if (isAuthedUser) {
      this.setState({ numLikes: this.props.feed.likes.length })
    }
    axios
      .get("/api/follows/" + this.state.username + "/following")
      .then(res => {
        this.setState({
          following: res.data.following
        });
      })
      .catch(err => console.log(err));
      
    axios
      .get("/api/follows/" + this.state.username + "/followers")
      .then(res => {
        this.setState({
          followers: res.data.followers
        });
      })
      .catch(err => console.log(err));
  }

  navToLikesPage = (e) => {
    e.preventDefault();
    window.location.href = "/user/" + this.state.username + "/likes";
  }

  onToggleFollowingModal = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      openModal: !prevState.openModal,
      isFollowingModal: true
    }));
  }

  onToggleFollowerModal = (e) => {
    e.preventDefault();
    // open modal and set modal to "following" mode
    this.setState(prevState => ({
      openModal: !prevState.openModal,
      isFollowingModal: false
    }));
  }

  onClose = () => {
    this.setState({ openModal: false });
  }

  onAddTag = (e) => {
    e.preventDefault();
    this.setState({
      tag: document.getElementById("tag").value
    });
    // close modal, resets tag field
    this.onClose()
  }

  render() {
    const username2 = !isEmpty(this.props.auth.user) ? this.props.auth.user.username : "";
    const isAuthenticated = this.props.auth.isAuthenticated;
    const isAuthedUser = isAuthenticated && (this.state.username === username2);
    return (
      <Fragment>
        <Modal scrollBehavior="inside" motionPreset="slideInBottom" isOpen={this.state.openModal} onClose={this.onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{this.state.isFollowingModal ? 'Following' : 'Followers'}</ModalHeader>
            <ModalCloseButton onClose={this.onToggleModal} />
            <ModalBody>
              {this.state.isFollowingModal ? 
                this.state.following.map((f) => 
                  <Fragment key={f.id}>
                    <Divider />
                    <Flex my="2" textStyle="h3">
                      <Avatar size="xs" name={f.name} src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640" />
                      &ensp;{f.name}&thinsp;
                      <Link href={"/user/" + f.username} _hover={{ color: "black" }}>
                        @{f.username}
                      </Link>
                    </Flex>
                  </Fragment>
                )
                :
                this.state.followers.map((f) => 
                  <Fragment key={f.id}>
                    <Divider />
                    <Flex my="2" textStyle="h3">
                      <Avatar size="xs" name={f.name} src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640" />
                      &ensp;{f.name}&thinsp;
                      <Link href={"/user/" + f.username} _hover={{ color: "black" }}>
                        @{f.username}
                      </Link>
                    </Flex>
                  </Fragment>
                )
              }
            </ModalBody>
            <ModalFooter />
          </ModalContent>
        </Modal>
        <Stack w="2xs" direction="column" spacing={4} align="center">
          <Button
            variant="sidebarButton" 
            leftIcon={<Icon as={CgAdd} w={5} h={5} />}
            onClick={this.onToggleFollowingModal}
          >
            {this.state.following.length} Following
          </Button>
          <Button
            variant="sidebarButton"
            leftIcon={<Icon as={MdPersonOutline} w={5} h={5} />}
            onClick={this.onToggleFollowerModal}
          >
            {this.state.followers.length === 1 ? "1 Follower" : this.state.followers.length + " Followers"}
          </Button>
          {isAuthedUser && 
            <Button
              variant="sidebarButton"
              leftIcon={<Icon as={CgHeart} w={5} h={5} />}
              onClick={this.navToLikesPage}
            >
              {this.state.numLikes === 1 ? "1 Like" : this.state.numLikes + " Likes"}
            </Button>
          }
        </Stack>
      </Fragment>
    );
  }
}


ProfileStats.propTypes = {
  auth: PropTypes.object.isRequired,
  feed: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    feed: state.feed
  };
};

export default connect(mapStateToProps)(ProfileStats);