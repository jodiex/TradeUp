import React, { Component } from "react";
import { Box } from "@chakra-ui/react"
import Profile from './Profile';
import Nav from './Nav';
import ProfileStats from './ProfileStats';

class Sidebar extends Component {
    render() {
        return (
            <Box w="2xs" mt={["6", "10"]}>
                <Nav />
                <Profile />
                <ProfileStats />
            </Box>
        );
    }
}

export default Sidebar;