import React from "react";
import { CgHeart } from "react-icons/cg";
import { AiOutlineRetweet } from "react-icons/ai";
import { Box, Text, Button, HStack, IconButton } from "@chakra-ui/react";

const Post = (props) => {
  // date processing
  const date = new Date(props.date);
  var hour = date.getHours();
  var isAm = true;
  if (hour >= 12) {
    isAm = false;
  }
  if (hour >= 13) {
    // convert from military time
    hour = hour - 12
  } else if (hour === 0) {
    hour = 12;
  }
  var mins = date.getMinutes();
  if (mins < 10) {
    // pad minutes with 0
    mins = "0" + mins
  }
  const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const month = shortMonths[date.getMonth()];
  const day = date.getDate();

  return (
    <Box h={["9em", null, "9em", null, "8em"]} bg="white" borderRadius="xl" py="3" px="4" pos="relative" mb={5}>
      <HStack>
        <Text textStyle="h3">{props.name}</Text>
        <Text textStyle="h4">@{props.username}</Text>
        { props.tag && 
          <Button
          variant="secondary"
          textStyle="h7"
          size="xs">
            # {props.tag}
          </Button>
        }
      </HStack>
      <Text textStyle="h6" mt="1">{props.text}</Text>
      <HStack pos="absolute" bottom="3" left="1">
        <IconButton aria-label="Retweet" variant="link" icon={<AiOutlineRetweet />}/>
        <IconButton aria-label="Like" variant="link" icon={<CgHeart />}/>
        <Text textStyle="h6" pl="1">{hour}:{mins}{isAm? "am" : "pm"}&emsp;{month} {day}</Text>
      </HStack>
    </Box>
  );
}

export default Post;