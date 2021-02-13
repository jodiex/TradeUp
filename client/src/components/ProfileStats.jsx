import React, { Component } from "react";
import { MdPersonOutline } from "react-icons/md";
import { CgAdd, CgHeart } from "react-icons/cg";
import { Stack, Button, Icon } from "@chakra-ui/react"



class Profile extends Component {
  render() {
    return (
        <Stack w="2xs" direction="column" spacing={4} align="center">
            <Button variant="sidebarButton" leftIcon={<Icon as={CgAdd} w={5} h={5} />}>320 Following</Button>
            <Button variant="sidebarButton" leftIcon={<Icon as={MdPersonOutline} w={5} h={5} />}>9.6k Followers</Button>
            <Button variant="sidebarButton" leftIcon={<Icon as={CgHeart} w={5} h={5} />}>543 Likes</Button>
        </Stack>
    );
    }
}

export default Profile;