import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
const HomePage = () => {
  const history = useHistory();
  
  useEffect(() => {
      
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
   

    if(userInfo){
        history.push('/chat');
    }


}, [history])

  return (
    <Container>
      <Box
        display={"flex"}
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize={"4xl"} fontFamily="Work sans" color="b">
          {" "}
          Chit-Chat 💬{" "}
        </Text>
      </Box>
      <Box mt={"20px"} p={3} bg={"white"} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded">
          <TabList mb={"1em"}>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
