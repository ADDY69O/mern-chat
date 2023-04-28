import { React, useState } from "react";
import axios from 'axios';
import { useNavigate} from 'react-router-dom'
import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
const Signup = () => {
  const navigate = useNavigate();
  const toast=useToast()
  const [show, setshow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setloading] = useState(false);
  const handleonClick = () => {
    setshow(!show);
  };
  const submitHandler = async() => {
    setloading(true);
    
    if(password !==confirmpassword){
      toast({
        title:`password & confirm password not same`,
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top",
    
      })
      setloading(false);
return;
    } 

    try {
      
      const config={
        headers:{
          'Content-Type': 'application/json'
        }
      }
  
      const res=  await axios.post('http://localhost:5000/api/user/',{name,email,password,pic},config
      
      )
      console.log(res);
      toast({
        title:`Registration Successfull`,
        status:"success",
        duration:5000,
        isClosable:true,
        position:"top",
    
      })
      localStorage.setItem("userInfo",JSON.stringify(res));
      setloading(false);
      navigate('/chat');
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
  const postDetails = async(pics) => {
    setloading(true);
    if(pics===undefined){
      toast({
        title:"Select a image first!",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"bottom"

      })

      setloading(false);
      return;
    }
    console.log(pics.type);
    try{
    if(pics.type!== "image/jpeg" && pics.type!== "image/png"){
      console.log("hello");
      toast({
        title:"Select a image of jpeg or png type!",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top",
    
      })
      setloading(false);
      return;
    }else{

      const data=new FormData();
      data.append("file", pics);
      data.append("upload_preset","chat-app");
      data.append("cloud_name","dwhaatbao");
 

    const res= await fetch("https://api.cloudinary.com/v1_1/dwhaatbao/image/upload",{
        method:'post',    
        body:data
      }).then((res)=>res.json())
      .then((data)=>{
        setPic(data.url.toString());
        console.log(data.url.toString());
        setloading(false);
        toast({
          title:"image uploaded !",
          status:"success",
          duration:5000,
          isClosable:true,
          position:"bottom",
         
        })
        return;
      }).catch((err)=>{
        console.log(err);
        setloading(false);
        return;
      })
      



     
    }
  }catch(err){
    toast({
      title:`Only jpeg and png images allowed`,
      status:"error",
      duration:5000,
      isClosable:true,
      position:"bottom",
     
    })
    setloading(false);
    return;
  }





  };
  return (
    <VStack spacing={"5px"}>
      <FormControl isRequired id="first-name">
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
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
            placeholder="Enter your Password"
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
      <FormControl isRequired id="confirmpassword">
        <FormLabel>Confirm Password</FormLabel>

        <InputGroup>
          <Input
            placeholder="Enter your Password"
            type={show ? "text" : "password"}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size="sm" onClick={handleonClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your image</FormLabel>
        <Input
          p={"1.5"}
          type={"file"}
          accept="image/*"
          
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        mt={"15px"}
        isLoading={loading}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
