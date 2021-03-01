import React, { Component } from "react";
import {
  Box,
  Input,
  Button,
  Stack,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, } from "@chakra-ui/react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../actions/feedActions";

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      tag: "",
      openModal: false
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // add a new post only if text isn't empty
    if (this.state.text !== "") {
      const postData = {
        username: this.props.username,
        tag: this.state.tag,
        text: this.state.text,
        date: new Date()
      };
      
      axios
        .post("/api/posts/", postData)
        .then(res => {
          // reset write field
          document.getElementById("text").value = "";
        })
        .catch(err => {
          console.log(err);
        });
    
      // reset text and tag fields
      this.setState({
        text: "",
        tag: "",
      });

      // re-get posts in redux state
      this.props.getPosts(this.props.username);
    }
  };

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
    return (
      <React.Fragment>
        <Box w={["sm", "md", "lg", "xl", "2xl"]}>
          <form onSubmit={this.handleSubmit}>
            <Input
              placeholder="Write something..."
              id="text"
              bg="white"
              border="none"
              borderRadius="lg"
              onChange={this.onChange}
            />
            <Stack direction="row" mt="2">
              <Button
              variant="secondary"
              textStyle="h7"
              size="xs"
              onClick={this.onToggleModal}>
                { this.state.tag !== "" ? this.state.tag : "# Add a tag..."}
              </Button>
              <Spacer />
              <Button
              variant="secondary"
              textStyle="h8"
              size="sm"
              type="submit">
                Twiddit!
              </Button>
            </Stack>
          </form>
        </Box>
        <Modal motionPreset="slideInBottom" isOpen={this.state.openModal} onClose={this.onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader />
            <ModalCloseButton onClose={this.onToggleModal} />
            <ModalBody>
              <Input
                placeholder="Add a tag..."
                id="tag"
                borderRadius="lg"
                mt={2}
              />
            </ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={this.onClose}>
                Cancel
              </Button>
              <Button variant="secondary" onClick={this.onAddTag}>
                Add tag
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </React.Fragment>
    );
  }
}


Write.propTypes = {
  getPosts: PropTypes.func.isRequired,
  feed: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    feed: state.feed
  };
};

export default connect(mapStateToProps, { getPosts })(Write);