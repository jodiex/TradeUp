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
  ModalFooter
} from "@chakra-ui/react"
import { connect } from "react-redux";
import PropTypes from "prop-types";

const isEmpty = require("is-empty");

class ProfileStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      openModal: false,
      numLikes: 0
    }
  }

  componentDidMount() {
    const username2 = !isEmpty(this.props.auth.user) ? this.props.auth.user.username : "";
    const isAuthenticated = this.props.auth.isAuthenticated;
    const isAuthedUser = isAuthenticated && (this.state.username === username2);
    if (isAuthedUser) {
      this.setState({ numLikes: this.props.feed.likes.length })
    }
  }

  navToLikesPage = (e) => {
    e.preventDefault();
    window.location.href = "/user/" + this.state.username + "/likes";
  }

  onToggleModal = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      openModal: !prevState.openModal
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
            <ModalHeader>Following</ModalHeader>
            <ModalCloseButton onClose={this.onToggleModal} />
            <ModalBody>
              Hello
              <Divider />
              Hello
              <Divider />
              Hello
            </ModalBody>
            <ModalFooter />
          </ModalContent>
        </Modal>
        <Stack w="2xs" direction="column" spacing={4} align="center">
          <Button
            variant="sidebarButton" 
            leftIcon={<Icon as={CgAdd} w={5} h={5} />}
            onClick={this.onToggleModal}
          >
            320 Following
          </Button>
          <Button variant="sidebarButton" leftIcon={<Icon as={MdPersonOutline} w={5} h={5} />}>9.6k Followers</Button>
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