import React from "react";

import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";

const Chat = () => {
  const [input, setInput] = React.useState("");

  const sendMessage = (e) => {
    e.preventDefault();
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Название чата</h3>
          <p>Последний раз был(а) в сети...</p>
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

      <div className="chat__body">
        {/* мое сообщение */}
        <p className={`chat__message ${true && "chat__reciever"}`}>
          <span className="chat__name">Артем Фролов</span>
          привет
          <span className="chat__timestamp">12:44</span>
        </p>
        {/* сообщение собеседника */}
        <p className={`chat__message`}>
          <span className="chat__name">не Артем Фролов</span>И тебе привет
          <span className="chat__timestamp">12:44</span>
        </p>
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form action="">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            name=""
            id=""
          />
          <button onClick={sendMessage}>Отправить</button>
        </form>
        <Mic />
      </div>
    </div>
  );
};

export default Chat;
