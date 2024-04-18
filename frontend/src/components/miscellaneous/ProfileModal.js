import {
  Avatar,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import React from "react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box>
        <Text onClick={onOpen}>{children}</Text>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            d="flex"
            justifyContent={"center"}
            alignContent="center"
            alignItems={"center"}
          >
            <ModalHeader>{user.data.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Avatar name={user.data.name} src={user.data.pic} size="2xl" />
            </ModalBody>
            <ModalHeader>{user.data.email}</ModalHeader>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default ProfileModal;
