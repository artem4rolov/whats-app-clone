import React from "react";

import "./SidebarChat.css";
import { Avatar } from "@mui/material";

const SidebarChat = ({ addNewChat }) => {
  const createChat = () => {
    const roomName = prompt("Придумайте название чата");

    if (roomName) {
      // что-то делаем
    }
  };

  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__info">
        <h2>Название чата</h2>
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
