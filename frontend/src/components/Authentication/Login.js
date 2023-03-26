import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
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
  const toast=useToast();
  const history=useHistory();
  const [loading, setloading] = useState(false)
  const [show, setshow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleonClick = () => {
    setshow(!show);
  };
  const submitHandler = async() => {
    setloading(true);
    
   

    try {
      
      const config={
        headers:{
          'Content-Type': 'application/json'
        }
      }
  
      const res=  await axios.post('http://localhost:5000/api/user/login',{email,password},config
      
      )
      console.log(res);
      toast({
        title:`Login Successfull`,
        status:"success",
        duration:5000,
        isClosable:true,
        position:"top",
    
      })
      localStorage.setItem("userInfo",JSON.stringify(res));
      setloading(false);
      history.push('/chat');
    } catch (error) {
      console.log(error);
      toast({
        title:"Error Occured!",
        description:`${error.response.data.error}`,
        status:"error",
        duration:5000,
        isClosable:true,
        position:"top",
    
      })
      setloading(false)
    }
  };
  return (
    <VStack spacing={"5px"}>
      <FormControl isRequired id="email">
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired id="password">
        <FormLabel>Password</FormLabel>

        <InputGroup>
          <Input
            placeholder="Enter your Password "
            type={show ? "text" : "password"}
            value={password}
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
        isLoading={loading}
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
