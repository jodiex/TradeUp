import React, { Component } from "react";
import { Container, Image } from "@chakra-ui/react"
import logo from "../logo.png";

class Logo extends Component {
  render() {
    return (
        <Container centerContent>
            <Image src={logo} w="44" alt="Twiddit." />
        </Container>
    );
    }
}

export default Logo;