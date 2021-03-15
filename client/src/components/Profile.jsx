import React, { useState, useEffect } from "react";
import { MdPersonAdd } from "react-icons/md";
import { HiOutlinePencil } from "react-icons/hi";
import { Box, Text, Container, Button, Icon, Image, Input, Textarea } from "@chakra-ui/react"
import axios from "axios";
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';
import { connect } from "react-redux";
import PropTypes from "prop-types";

const isEmpty = require("is-empty");

const Profile = (props) => {
  const [name, setName] = useState('');
  const username = props.username;
  const [bio, setBio] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);

  // redux state
  var username2 = !isEmpty(props.auth.user) ? props.auth.user.username : null;
  var userId = !isEmpty(props.auth.user) ? props.auth.user.id : null;
  var isAuthenticated = props.auth.isAuthenticated;

  useEffect(() => {
    let mounted = true;
    // on component mount, get user data
    axios
      .get("/api/users/user/" + username)
      .then(res => {
        const { name, bio, emojiStatus } = res.data;
        if (mounted) {
          setName(name);
          setBio(bio);
          setEmojiStatus(emojiStatus);
        }
      })
      .catch(err =>
        console.log(err)
      );
      
    if (isAuthenticated) {
      axios
        .get("/api/follows/" + username, { params: { follower: userId } })
        .then(res => {
          const { follow } = res.data;
          if (mounted) {
            setIsFollowing(follow);
          }
        })
        .catch(err =>
          console.log(err)
        );
    }

    return () => mounted = false;
  }, [username]);

  // emoji status
  const [emojiStatus, setEmojiStatus] = useState('grinning');
  const [togglePicker, setTogglePicker] = useState(false);
  const onEmojiClick = (emoji) => {
    setEmojiStatus(emoji.id)
    setTogglePicker(false);

    // update emoji status in db
    const reqBody = {
      name: name,
      bio: bio,
      emojiStatus: emoji.id
    };
    axios
      .put("/api/users/user/" + username, reqBody)
      .catch(err => console.log(err));
  };
  const onPickerClick = (e) => {
    e.preventDefault();
    setTogglePicker((state) => !state);
  }

  // edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  const onSaveProfile = (e) => {
    e.preventDefault();
    const nameValue = document.getElementById("name").value;
    const bioValue = document.getElementById("bio").value;
    setName(nameValue);
    setBio(bioValue);
    setIsEditMode(false);

    // update name and bio in db
    const reqBody = {
      name: nameValue,
      bio: bioValue,
      emojiStatus: emojiStatus
    };
    axios
      .put("/api/users/user/" + username, reqBody)
      .catch(err => console.log(err));
  }
  const onEditProfile = (e) => {
    e.preventDefault();
    setIsEditMode(true);
  }

  // follow
  const onFollowClick = (e) => {
    if (!isAuthenticated) {
      // redirect to login if not authed
      window.location.href = "/login";
    } else {
      e.preventDefault();
      // add new follow to db
      const followBody = {
        name: name,
        follower: userId,
        date: new Date()
      };
      axios
        .post("/api/follows/" + username, followBody)
        .then(res => {
          setIsFollowing(true);
        })
        .catch(err => console.log(err));
    }
  }

  const onUnfollowClick = (e) => {
    if (!isAuthenticated) {
      // redirect to login if not authed
      window.location.href = "/login";
    } else {
      e.preventDefault();
      // delete follow
      axios
        .delete("/api/follows/" + username, { params: { follower: userId } })
        .then(res => {
          setIsFollowing(false);
        })
        .catch(err => console.log(err));
    }
  }


  return (
    <Box w="2xs" pos="relative" mb="4">
      <Container centerContent>
        <Button
        size="sm"
        bg="white"
        onClick={isAuthenticated && (username === username2) ? onPickerClick : undefined}
        zIndex="2"
        ml="32"
        borderRadius="full">
          <Emoji emoji={emojiStatus} size={18} set="apple"/>
        </Button>
        { togglePicker && 
          <Box zIndex="3" pos="absolute" top="8">
            <Picker onSelect={isAuthenticated && (username === username2) ? onEmojiClick : undefined} set="apple" perLine={8} title="" emoji=""/>
          </Box>
        }
        <Image boxSize="10em" src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640" pos="absolute" borderRadius="full" />
      </Container>
      <Box
      bg="white"
      h="xs"
      borderRadius="2xl"
      pt="5em"
      mt="4em"
      >
        <Container centerContent px="6">
          {isEditMode ? 
            <Input defaultValue={name} size="sm" textAlign="center" id="name"/>
            :
            <Text textStyle="h2">{name}</Text>
          }
          <Text textStyle="h4" mt="2">@{username}</Text>
        </Container>
        <Container mt="2" px="6">
          {isEditMode ? 
            <Textarea defaultValue={bio} size="sm" id="bio"/>
            :
            <Text textStyle="h6">{bio}</Text>
          }
        </Container>
        <Container centerContent pos="absolute" bottom="4">
          { isAuthenticated && username === username2 ?
              <Button
              variant="secondary"
              textStyle="h2"
              leftIcon={<Icon as={HiOutlinePencil} w={5} h={5} />}
              onClick={isEditMode ? onSaveProfile : onEditProfile }
              >
                {isEditMode ?
                  'Save Profile'
                  :
                  'Edit Profile'
                }
              </Button>
              :
              <Button
              variant={isFollowing ? "outline" : "secondary"}
              textStyle="h2"
              leftIcon={!isFollowing && <Icon as={MdPersonAdd} w={5} h={5} />}
              onClick={isFollowing ? onUnfollowClick : onFollowClick }
              >
                {isFollowing ?
                  'Unfollow'
                  :
                  'Follow'
                }
              </Button>
          }
        </Container>
      </Box>
    </Box>
  );
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Profile);