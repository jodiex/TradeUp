import React, { Component } from "react";
import { ImPlus, ImMinus } from "react-icons/im";
import { MdPeople } from "react-icons/md";
import { Box, Text, Container, IconButton, Icon, Flex, Spacer } from "@chakra-ui/react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateCommunities } from "../actions/feedActions";

class Communities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trending: []
    };
  }

  componentDidMount() {
    axios
      .get("/api/communities/trending")
      .then(res => {
        this.setState({
          trending: res.data.communities
        });
        // update joined communities in redux
        this.updateCommunities(this.props.auth.user.username);
      })
      .catch(err => console.log(err));
  }


  // follow
  onFollowClick = (e) => {
    if (!this.props.auth.isAuthenticated) {
      // redirect to login if not authed
      window.location.href = "/login";
    } else {
      e.preventDefault();
      // add new follow to db
      const followBody = {
        follower: this.props.auth.user.id,
        date: new Date()
      };
      console.log(e.target.id)
      // axios
      //   .post("/api/communities/follow/" + e.target.id, followBody)
      //   .then(res => {
      //     // update joined communities in redux
      //     this.updateCommunities(this.props.auth.user.username);
      //   })
      //   .catch(err => console.log(err));
    }
  };

  // follow
  onUnfollowClick = (e) => {
    if (!this.props.auth.isAuthenticated) {
      // redirect to login if not authed - should not be possible
      window.location.href = "/login";
    } else {
      e.preventDefault();
      // delete follow
      axios
        .delete("/api/communities/follow/" + e.target.id, { params: { follower: this.props.auth.user.id } })
        .then(res => {
          // update joined communities in redux
          this.updateCommunities(this.props.auth.user.username);
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    console.log(this.props.feed)
    return (
        <Box w="2xs"
        bg="white"
        h="sm"
        borderRadius="2xl"
        >
            <Container p="4">
                <Text textStyle="h2">Popular Communities&ensp;<Icon as={MdPeople} w={5} h={5} /></Text>
                { this.state.trending.map((comm) => 
                  <Flex mt="2">
                      <Text textStyle="h5"># {comm}</Text>
                      <Spacer />
                      <IconButton
                        id={comm}
                        aria-label="Join Community"
                        variant="secondary"
                        size="xs"
                        icon={comm in this.props.feed.communities ? <ImMinus /> : <ImPlus />}
                        onClick={comm in this.props.feed.communities ? this.onFollowClick : this.onUnfollowClick}/>
                  </Flex>
                )}
            </Container>
        </Box>
    );
    }
}

Communities.propTypes = {
  auth: PropTypes.object.isRequired,
  feed: PropTypes.object.isRequired,
  updateCommunities: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    feed: state.feed
  };
};

export default connect(mapStateToProps, { updateCommunities })(Communities);