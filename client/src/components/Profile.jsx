import React, { useState, useEffect } from "react";
import { MdPersonAdd } from "react-icons/md";
import { HiOutlinePencil } from "react-icons/hi";
import { Box, Text, Container, Button, Icon, Image } from "@chakra-ui/react"
import axios from "axios";
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Profile = (props) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    // on component mount, get user data
    setUsername(props.username);
  
    axios
      .get("/api/users/" + props.username)
      .then(res => {
        const { name, bio, emojiStatus } = res.data;
        setName(name);
        setBio(bio);
        setEmojiStatus(emojiStatus);
      })
      .catch(err =>
        console.log(err)
      );
  }, []);

  // emoji status
  const [emojiStatus, setEmojiStatus] = useState('grinning');
  const [picker, setPicker] = useState(false);

  const onEmojiClick = (emoji) => {
    setEmojiStatus(emoji.id);
    setPicker(false);
  };

  const onPickerClick = (e) => {
    e.preventDefault();
    setPicker(!picker);
  }

  // redux state
  const username2 = props.auth.username;
  const isAuthenticated = props.auth.isAuthenticated;


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
        { picker && 
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
          <Text textStyle="h3">{name}</Text>
          <Text textStyle="h4" mt="2">@{username}</Text>
        </Container>
        <Text textStyle="h6" mt="2" px="6">{bio}</Text>
        <Container centerContent pos="absolute" bottom="4">
          {isAuthenticated && username === username2 ?
            <Button
            variant="secondary"
            textStyle="h3"
            leftIcon={<Icon as={HiOutlinePencil} w={5} h={5} />}
            >
              Edit Profile
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