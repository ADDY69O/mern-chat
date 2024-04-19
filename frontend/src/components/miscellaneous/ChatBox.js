import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import {
  Avatar,
  Box,
  HStack,
  Spinner,
  Stack,
  Text,
  Toast,
  VStack,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import { calcLength } from "framer-motion";
import { Input } from "@chakra-ui/react";
import { getSender, lastMessage } from "../config/ChatLogics";
import axios from "axios";

const ChatBox = () => {
  const { selectedChat, user } = ChatState();

  const [loading, setLoading] = useState(false);
  const [messageLoading, setmessageLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const toast = useToast();

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/message/${selectedChat._id}`,
        config
      );
      console.log(data);
      setMessages(data.fetch);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error while Fetching Messages",
        status: "warning",
        duration: "5000",
        isClosable: true,
        position: "top-left",
      });
      return;
    }
  };

  const handleSendMessage = async () => {
    try {
      if (message.length === 0) {
        toast({
          title: "Message required",
          status: "warning",
          duration: "5000",
          isClosable: true,
          position: "top-left",
        });
        return;
      }

      setmessageLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };
      const requestData = {
        content: message,
        chatId: selectedChat._id,
      };

      console.log(config);
      const { data } = await axios.post(
        `http://localhost:5000/api/message/`,
        requestData,
        config
      );
      setMessage("");
      console.log(data);
      fetchMessages();
      toast({
        title: "Message Send Successfully",
        status: "success",
        duration: "5000",
        isClosable: true,
        position: "top-left",
      });
      setmessageLoading(false);
      return;
    } catch (error) {
      setmessageLoading(false);
      toast({
        title: "Error while Sending Messages",
        status: "warning",
        duration: "5000",
        isClosable: true,
        position: "top-left",
      });
      return;
    }
  };

  useEffect(() => {
    if (selectedChat) {
      fetchMessages();
    }
  }, [selectedChat]);

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
            align="center"
            justifyContent="space-between"
            pl={4}
            pr={4}
          >
            <Text fontSize="4xl">
              {!selectedChat.isGroupChat
                ? getSender(
                    JSON.parse(localStorage.getItem("userInfo")),
                    selectedChat.users
                  )
                : selectedChat.chatName}
            </Text>
            <i class="fa-solid fa-eye fa-2x"></i>
          </HStack>

          {loading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              mt="10%"
              w="500px"
              h="500px"
              ml="18%"
              align="center"
              alignItems="center"
            />
          ) : (
            <Box
              d="flex"
              direction="column"
              alignItems="end"
              justifyContent="flex-end"
              m={8}
              bg="white"
              w="95%"
              h="80%"
              borderRadius="20px"
              boxShadow="md"
              borderWidth="2px"
              borderColor="gray.100"
            >
              <Box
                d="flex"
                direction="column"
                alignItems="start"
                overflowY="scroll"
                justifyContent="start"
                m={8}
                w="95%"
                h="75%"
              >
                {messages?.map((item, index) => {
                  return (
                    <Wrap
                      d="flex"
                      direction="row"
                      gap="4px"
                      ml={
                        user.data._id === item.sender._id
                          ? "84%" // Align right if it's your message
                          : "0" // Align left if it's others' message
                      }
                      justifyContent={
                        user.data._id === item.sender._id
                          ? "flex-end" // Move to end if it's your message
                          : "flex-start" // Move to start if it's others' message
                      }
                    >
                      {!loading &&
                      lastMessage(messages, item.sender._id, index) ? (
                        <WrapItem>
                          <Avatar
                            mt={4}
                            mb={4}
                            size="sm"
                            name={item.sender.name}
                            src={item.sender.pic}
                          />{" "}
                        </WrapItem>
                      ) : (
                        ""
                      )}

                      <WrapItem>
                        <Text
                          d="flex"
                          direction="column"
                          bg={
                            user.data._id === item.sender._id
                              ? "blue.100"
                              : "green.100"
                          }
                          textAlign={
                            user.data._id === item.sender._id ? "left" : "right"
                          }
                          mt={2}
                          mb={2}
                          h="max-height"
                          color="black"
                          borderRadius="20px"
                          p="12px"
                        >
                          {item.content}
                        </Text>
                      </WrapItem>
                    </Wrap>
                  );
                })}
              </Box>

              <HStack
                d="flex"
                m="auto"
                direction="row"
                alignItems="center"
                justifyContent="flex-end" // Aligns items to the end of the container
                w="95%"
              >
                <Input
                  placeholder="Enter Message Here"
                  hasArrow
                  isDisabled={messageLoading}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                {messageLoading ? (
                  <Spinner w="40px" h="40px" color="blue" />
                ) : (
                  <i
                    class="fa-solid fa-paper-plane fa-2xl"
                    onClick={() => handleSendMessage()}
                  ></i>
                )}
              </HStack>
            </Box>
          )}
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
