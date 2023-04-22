  import React, { useState } from "react";
  import { useEffect } from "react";
  import axios from "axios";
  import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import ChatBox from "../components/miscellaneous/ChatBox";
import { MyChats } from "../components/miscellaneous/MyChats";
  const ChatPage = () => {
    const {user}= ChatState();


    return (
      <div style={{width:"100%"}}>
        {user && <SideDrawer/>}
        <Box style={{display:"flex" ,width:"100%" ,justifyContent:"space-between" ,padding:"10px",
      height:"91.5vh"} }>
          {user && <MyChats/>}
          {user && <ChatBox/>}
        </Box>
      </div>
    );
  };

  export default ChatPage;
