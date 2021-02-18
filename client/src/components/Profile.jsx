import React, { useState } from "react";
import { MdPersonAdd } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { Box, Text, Container, Button, Icon, Image } from "@chakra-ui/react"
import Picker from 'emoji-picker-react';

const Profile = () => {
    // emoji status
    const [emojiStatus, setEmojiStatus] = useState(null);
    const [picker, setPicker] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        console.log(emojiObject);
        setEmojiStatus(emojiObject);
        setPicker(false);
    };

    const onPickerClick = (event) => {
        setPicker(!picker);
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
                textStyle="h3"
                borderRadius="full">
                    { emojiStatus ? emojiStatus.emoji : '😀' }
                </Button>
                { picker && 
                    <Box zIndex="3" pos="absolute" top="8">
                        <Picker onEmojiClick={onEmojiClick} disableSearchBar={true} />
                    </Box>
                }
                <Image boxSize="10em" src="https://bit.ly/sage-adebayo" pos="absolute" borderRadius="full" />
            </Container>
            <Box
            bg="white"
            h="xs"
            borderRadius="3xl"
            pt="5em"
            mt="4em"
            >
                <Container centerContent px="6">
                    <Text textStyle="h3">John Smith</Text>
                    <Text textStyle="h4" mt="2">@username</Text>
                </Container>
                <Text textStyle="h6" mt="2" px="6">Lorem ipsum.</Text>
                <Container centerContent pos="absolute" bottom="4">
                    <Button
                    variant="secondary"
                    textStyle="h3"
                    leftIcon={<Icon as={MdPersonAdd} w={5} h={5} />}
                    >
                        Follow
                    </Button>
                </Container>
            </Box>
        </Box>
    );
}

export default Profile;