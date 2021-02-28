import React, { useState, useEffect } from "react";
import { MdPersonAdd } from "react-icons/md";
import { HiOutlinePencil } from "react-icons/hi";
import { Box, Text, Container, Button, Icon, Image, Input, Textarea } from "@chakra-ui/react"
import axios from "axios";
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Profile = (props) => {
  const [name, setName] = useState('');
  const username = props.username;
  const [bio, setBio] = useState('');

  useEffect(() => {
    // on component mount, get user data
    axios
      .get("/api/users/" + username)
      .then(res => {
        const { name, bio, emojiStatus } = res.data;
        setName(name);
        setBio(bio);
        setEmojiStatus(emojiStatus);
      })
      .catch(err =>
        console.log(err)
      );
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
      .post("/api/users/" + username, reqBody)
      .catch(err => console.log(err));
  };
  const onPickerClick = (e) => {
    e.preventDefault();
    setTogglePicker((state) => !state);
  }

  // redux state
  const username2 = props.auth.username;
  const isAuthenticated = props.auth.isAuthenticated;

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
      .post("/api/users/" + username, reqBody)
      .catch(err => console.log(err));
  }
  const onEditProfile = (e) => {
    e.preventDefault();
    setIsEditMode(true);
  }


  return (
    <Box w="2xs" pos="relative" mb="4">
      <Container centerContent>
        <Button
        size="sm"
        bg="white"
        onClick={onPickerClick}
        zIndex="2"
        ml="32"
        borderRadius="full">
          <Emoji emoji={emojiStatus} size={18} set="apple"/>
        </Button>
        { togglePicker && 
          <Box zIndex="3" pos="absolute" top="8">
            <Picker onSelect={onEmojiClick} set="apple" perLine={8} title="" emoji=""/>
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
            <Text textStyle="h3">{name}</Text>
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
              textStyle="h3"
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
              variant="secondary"
              textStyle="h3"
              leftIcon={<Icon as={MdPersonAdd} w={5} h={5} />}
              >
                Follow
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Profile);