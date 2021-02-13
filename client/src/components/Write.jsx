import React, { Component } from "react";
import { Box, Input, Button, Stack, Spacer } from "@chakra-ui/react";

class Write extends Component {
  render() {
    return (
        <Box w={["sm", "md", "lg", "xl", "2xl"]}>
            <Input placeholder="Write something..." bg="white" border="none" borderRadius="xl"/>
            <Stack direction="row" mt="2">
                <Button
                variant="secondary"
                textStyle="h7"
                size="xs">
                    # Add a tag...
                </Button>
                <Spacer />
                <Button
                variant="secondary"
                textStyle="h8"
                size="sm">
                    Twiddit!
                </Button>
            </Stack>
        </Box>
    );
    }
}

export default Write;