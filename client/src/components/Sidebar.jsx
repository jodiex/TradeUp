import React, { Component } from "react";
import { Box } from "@chakra-ui/react"
import Profile from './Profile';
import Nav from './Nav';
import ProfileStats from './ProfileStats';
import Search from './Search';
import Communities from './Communities';

class Sidebar extends Component {
    render() {
        return (
            <Box w="2xs" mt={["4", "8"]} position="sticky" top="8" alignSelf="flex-start">
                <Nav />
                <Profile />
                <ProfileStats />
            </Box>
        );
    }
}

export default Sidebar;