import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const ChatPage = () => {
  const [chats, setchats] = useState([]);
  const fetchchats = async () => {
    // const { data } = await axios.get("/api/chat");
    // setchats(data);
  };

  useEffect(() => {
    fetchchats();
  }, []);
  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;
