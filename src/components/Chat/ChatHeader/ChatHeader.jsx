import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ChatHeader.css";

import { Avatar, IconButton } from "@mui/material";
import { AttachFile, MoreVert, SearchOutlined } from "@mui/icons-material";

const ChatHeader = () => {
  const dispatch = useDispatch();

  // достаем переменные из redux
  const { apiTokenInstance, idInstance } = useSelector((state) => state.auth);
  const { chat, loadingMessages } = useSelector((state) => state.messages);

  return (
    <div className="chat__header">
      <Avatar alt="user avatar" src={chat ? chat.avatar : null} />

      <div className="chat__headerInfo">
        <h3>{chat ? chat.name : "Название чата"}</h3>
        <p>{chat ? chat.lastSeen : "Последний раз был(а) в сети..."}</p>
      </div>

      <div className="chat__headerRight">
        <IconButton>
          <SearchOutlined />
        </IconButton>
        <IconButton>
          <AttachFile />
        </IconButton>
        <IconButton>
          <MoreVert />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatHeader;
