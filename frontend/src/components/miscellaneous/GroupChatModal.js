import {
  Badge,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import UserListItem from "../UserAvtar/UserListItem";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";

const GroupChatModal = ({ children }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  console.log(users);

  const [searchResult, setSearchResult] = useState([]);
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const addUsers = (singleUser) => {
    if (!users.find((u) => u._id === singleUser._id)) {
      setUsers([...users, singleUser]);
    } else {
      toast({
        title: "user already added",
        status: "warning",
        duration: "5000",
        isClosable: true,
        position: "top-left",
      });
      return;
    }
  };

  const deleteUser = (singleUser) => {
    setUsers(users.filter((u) => u._id !== singleUser._id));
  };

  const fetchChats = async (search) => {
    if (!search) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/user/allUser?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data.user);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error while Fetching chat",
        status: "warning",
        duration: "5000",
        isClosable: true,
        position: "top-left",
      });
      return;
    }
  };

  const createGroup = async () => {
    if (!name || name.length < 4) {
      toast({
        title:
          "Please enter the group name with minimum length of 4 characters",
        status: "warning",
        duration: "5000",
        isClosable: true,
        position: "top-left",
      });
      return;
    } else if (!users || users.length < 2) {
      toast({
        title: "Required minimum 2 users for group chat",
        status: "warning",
        duration: "5000",
        isClosable: true,
        position: "top-left",
      });
      return;
    } else {
      try {
        setLoading(true);
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.data.token}`,
          },
        };

        const { data } = await axios.post(
          "http://localhost:5000/api/chat/group",
          { name, users: JSON.stringify(users) },
          config
        );

        if (!chats.find((c) => c._id === data.created[0]._id)) {
          setChats([data.created[0], ...chats]);
          setSelectedChat(data.created[0]);
        } else {
          const resultedChat = chats.find((c) => c._id === data.created[0]._id);
          setSelectedChat(resultedChat);
        }
        toast({
          title: "Group Created Successfully",
          status: "success",
          duration: "5000",
          isClosable: true,
          position: "top-left",
        });
        setLoading(false);
        onClose();
        return;
      } catch (error) {
        toast({
          title: "Internal Server error",
          status: "warning",
          duration: "5000",
          isClosable: true,
          position: "top-left",
        });
        return;
      }
    }
  };

  const resetValues = () => {
    setName("");
    setUsers([]);
    setSearchResult([]);
    onClose();
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            allign={"center"}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text> Create Group Chat </Text>
            <Button
              onClick={() => {
                resetValues();
              }}
            >
              <i class="fa-sharp fa-solid fa-xmark" size="12"></i>
            </Button>
          </ModalHeader>

          <ModalBody>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftAddon>Group Name</InputLeftAddon>
                <Input
                  type="text"
                  placeholder="enter group name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>

              <InputGroup>
                <InputLeftAddon>Add Peoples</InputLeftAddon>
                <Input
                  placeholder="search user here"
                  onChange={(e) => fetchChats(e.target.value)}
                />
              </InputGroup>
            </Stack>

            <Stack direction="row" mt={2}>
              {users?.map((singleUser) => {
                return (
                  <Box direction="row">
                    <Badge
                      colorScheme="purple"
                      borderRadius="8"
                      cursor="pointer"
                    >
                      {singleUser.name}{" "}
                      <i
                        class="fa-sharp fa-solid fa-xmark"
                        onClick={() => deleteUser(singleUser)}
                      ></i>
                    </Badge>
                  </Box>
                );
              })}
            </Stack>

            <Box mt={4}>
              {loading ? (
                <Stack>
                  <Skeleton height="10vh" />
                </Stack>
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => addUsers(user)}
                  />
                ))
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={() => createGroup()}>
              Create Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
