import React, { Component } from "react";
import { Text } from "@chakra-ui/react";

class Title extends Component {
  render() {
    return (
        <Text textStyle="h1" w={["sm", "md", "lg", "xl", "2xl"]}>
            Posts
        </Text>
    );
    }
}

export default Title;