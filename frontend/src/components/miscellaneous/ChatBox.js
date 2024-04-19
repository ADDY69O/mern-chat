import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Box, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { calcLength } from "framer-motion";
import { Input } from "@chakra-ui/react";

const ChatBox = () => {
  const { selectedChat, user } = ChatState();
  console.log(selectedChat);
  return (
    <Box>
      {selectedChat ? (
        <Box
          d="flex"
          flexDir="column"
          alignItems="center"
          p={3}
          bg="white"
          w={"66vw"}
          h={"100%"}
          borderRadius="lg"
          borderWidth="1px"
        >
          <HStack
            d="flex"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            pl={4}
            pr={4}
          >
            <Text fontSize="4xl">
              {!selectedChat.isGroupChat
                ? user._id === selectedChat.users[0]._id
                  ? selectedChat.users[1].name
                  : selectedChat.users[0].name
                : selectedChat.chatName}
            </Text>
            <i class="fa-solid fa-eye fa-2x"></i>
          </HStack>
          <Box
            d="flex"
            direction="column"
            overflowY="auto"
            alignItems="center"
            m={8}
            bg="white"
            w="95%"
            h="80%"
            borderRadius="20px"
            boxShadow="md"
            borderWidth="2px"
            borderColor="gray.100"
          ></Box>
          <HStack
            d="flex"
            m="auto"
            direction="row"
            alignItems="center"
            justifyContent="center"
            w="95%"
          >
            <Input placeholder="Enter Message Here" hasArrow />
            <i class="fa-solid fa-paper-plane fa-2xl"></i>
          </HStack>
        </Box>
      ) : (
        <VStack
          d="flex"
          flexDir="row"
          alignItems="center"
          p={3}
          bg="white"
          w={"66vw"}
          h={"100%"}
          borderRadius="lg"
          justifyContent="center"
          borderWidth="1px"
        >
          <Text fontSize="6xl">Welcome to Chit-Chat 👋</Text>
        </VStack>
      )}
    </Box>
  );
};

export default ChatBox;
