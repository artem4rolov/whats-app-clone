import React from "react";

import "./SidebarChat.css";
import { Avatar } from "@mui/material";

const SidebarChat = ({ addNewChat, chat }) => {
  const createChat = () => {
    const roomName = prompt("Придумайте название чата");

    if (roomName) {
      // что-то делаем
    }
  };

  React.useEffect(() => {}, []);

  // console.log(chat);

  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar alt="chat avatar" src={chat ? chat.avatar : null} />
      <div className="sidebarChat__info">
        <h2>{chat.name}</h2>
        <p>Последнее сообщение</p>
      </div>
    </div>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Добавить чат</h2>
    </div>
  );
};

export default SidebarChat;
