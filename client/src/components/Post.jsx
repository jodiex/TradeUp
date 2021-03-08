import React, { Fragment, useState } from "react";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { AiOutlineRetweet } from "react-icons/ai";
import { Box, Text, Button, HStack, IconButton, Tag, TagLeftIcon, TagLabel } from "@chakra-ui/react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateLikes } from "../actions/feedActions";

const isEmpty = require("is-empty");

const Post = (props) => {
  // date processing
  const date = new Date(props.date);
  var hour = date.getHours();
  var isAm = true;
  if (hour >= 12) {
    isAm = false;
  }
  if (hour >= 13) {
    // convert from military time
    hour = hour - 12
  } else if (hour === 0) {
    hour = 12;
  }
  var mins = date.getMinutes();
  if (mins < 10) {
    // pad minutes with 0
    mins = "0" + mins
  }
  const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const month = shortMonths[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // on reshare click
  const [isReshared, setIsReshared] = useState(false);
  const onReshareClick = (e) => {
    e.preventDefault();
    if (props.auth.isAuthenticated) {
      const postData = {
        username: !isEmpty(props.auth.user) ? props.auth.user.username : "",
        author: props.author,
        authorName: props.authorName,
        tag: props.tag,
        text: props.text,
        date: new Date(),
        reshared: true
      };
      axios
        .post("/api/posts/", postData)
        .then(res => {
          setIsReshared(true);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  // on like click
  const [isLiked, setIsLiked] = useState(props.liked);

  const onLikeClick = (e) => {
    e.preventDefault();
    if (props.auth.isAuthenticated) {
      const username = !isEmpty(props.auth.user) ? props.auth.user.username : "";
      const likeData = {
        post: props.id,
        likedBy: username,
        date: new Date()
      };
      axios
        .post("/api/likes/", likeData)
        .then(res => {
          setIsLiked(true);
          props.updateLikes(username);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  // on unlike click
  const onUnlikeClick = (e) => {
    e.preventDefault();
    if (props.auth.isAuthenticated) {
      const username = !isEmpty(props.auth.user) ? props.auth.user.username : "";
      axios
        .delete("/api/likes/" + username, { params: { post: props.id } })
        .then(res => {
          setIsLiked(false);
          props.updateLikes(username);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  return (
    <Box h={["9em", null, "9em", null, "8em"]} bg="white" borderRadius="xl" py="3" px="4" pos="relative" mb={5}>
      <HStack>
        <Text textStyle="h3">{props.authorName}</Text>
        <Text textStyle="h4">@{props.author}</Text>
        { props.tag && 
          <Button
          variant="secondary"
          textStyle="h7"
          size="xs">
            # {props.tag}
          </Button>
        }
        { props.reshared &&
          <Tag textStyle="h6">
            <TagLeftIcon as={AiOutlineRetweet} />
            <TagLabel>Reshared</TagLabel>
          </Tag>
        }
      </HStack>
      <Text textStyle="h6" mt="1">{props.text}</Text>
      <HStack pos="absolute" bottom="3" left="1">
        {props.auth.isAuthenticated &&
          <Fragment>
            <IconButton
              aria-label="Reshare"
              variant="link"
              icon={<AiOutlineRetweet />}
              onClick={!isReshared ? onReshareClick : undefined}
              isActive={isReshared}/>
            <IconButton
              aria-label="Like"
              variant="link"
              icon={isLiked ? <HiHeart /> : <HiOutlineHeart />}
              onClick={isLiked ? onUnlikeClick : onLikeClick}
              isActive={isLiked}/>
          </Fragment>
        }
        <Text textStyle="h6" pl={props.auth.isAuthenticated ? "1" : "3"}>{hour}:{mins}{isAm? "am" : "pm"}&emsp;{month} {day}, {year}</Text>
      </HStack>
    </Box>
  );
}


Post.propTypes = {
  auth: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { updateLikes })(Post);
