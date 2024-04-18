import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import UserListItem from "../UserAvtar/UserListItem";
import ChatLoading from "./ChatLoading";
import ProfileModal from "./ProfileModal";

const SideDrawer = () => {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const logOut = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  const toast = useToast();
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/chat/",
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data.isChat[0]._id)) {
        setChats([data.isChat[0], ...chats]);
        setSelectedChat(data.isChat[0]);
      } else {
        const resultedChat = chats.find((c) => c._id === data.isChat[0]._id);
        setSelectedChat(resultedChat);
      }

      setLoadingChat(false);
      onClose();
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
  };
  const fetchChats = async () => {
    if (!search) {
      toast({
        title: "Please enter something in search",
        status: "warning",
        duration: "5000",
        isClosable: true,
        position: "top-left",
      });
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

      toast({
        title: "Search successfull",
        items: data,
        status: "success",
        duration: "5000",
        isClosable: true,
        position: "top-left",
      });
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
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        p="5px 10px 5px 10px"
        bg="white"
      >
        {/* {console.log({user})} */}
        <Tooltip label="search user to chat" hasArrow placement="bottom-end">
          <Button variant={"ghost"} gap="7px" onClick={onOpen}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text d={{ base: "none", md: "flex" }}>Search User</Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="work sans">
          Chit-Chat
        </Text>

        <div gap="20px">
          <Menu>
            <MenuButton p={1}>
              <i className="fa-solid fa-bell fa-xl" m={1}></i>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<i className="fa-solid fa-angle-down"></i>}
            >
              <Avatar
                size={"sm"}
                cursor="pointer"
                name={user.data.name}
                src={user.data.pic}
              />
            </MenuButton>
            <MenuList w={"100%"}>
              <ProfileModal user={user} w={"100%"}>
                <MenuItem> My Profile</MenuItem>
              </ProfileModal>

              <MenuDivider />
              <MenuItem onClick={logOut}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>Search Users</DrawerHeader>

            <DrawerBody>
              <Box display="flex" pb={2}>
                <Input
                  placeholder="Search by name or email"
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={fetchChats}>Go</Button>
              </Box>
              <Box>
                {loading ? (
                  <ChatLoading />
                ) : (
                  searchResult?.map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => accessChat(user._id)}
                    />
                  ))
                )}
              </Box>
              {loadingChat && <Spinner ml="auto" display="flex" />}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default SideDrawer;
