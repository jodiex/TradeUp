import React, { Component } from "react";
import { HiSearch } from "react-icons/hi";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

class Search extends Component {
  render() {
    return (
        <Box mb="6">
            <InputGroup>
                <InputLeftElement
                pointerEvents="none"
                children={<HiSearch color="#A0AEC0" />}
                />
                <Input placeholder="Search something..." bg="white" border="none" borderRadius="xl"/>
            </InputGroup>
        </Box>
    );
    }
}

export default Search;