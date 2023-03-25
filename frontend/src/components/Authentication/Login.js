import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
const Login = () => {
  const [show, setshow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleonClick = () => {
    setshow(!show);
  };
  const submitHandler = () => {};
  return (
    <VStack spacing={"5px"}>
      <FormControl isRequired id="email">
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired id="password">
        <FormLabel>Password</FormLabel>

        <InputGroup>
          <Input
            placeholder="Enter your Password "
            type={show ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size="sm" onClick={handleonClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
      <Button
        variant={"solid"}
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Demo Credentials
      </Button>
    </VStack>
  );
};

export default Login;
