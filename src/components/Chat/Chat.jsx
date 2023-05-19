import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Chat.css";

import ChatHeader from "./ChatHeader/ChatHeader";
import ChatBody from "./ChatBody/ChatBody";
import ChatFooter from "./ChatFooter/ChatFooter";

const Chat = () => {
  const dispatch = useDispatch();

  // достаем переменные из redux
  const { apiTokenInstance, idInstance } = useSelector((state) => state.auth);
  const { chat, loadingMessages } = useSelector((state) => state.messages);

  return (
    <div className="chat">
      {chat ? (
        <>
          {/* шапка чата */}
          <ChatHeader />

          {/* сообщения чата */}
          <ChatBody />

          {/* ввод сообщения */}
          <ChatFooter />
        </>
      ) : (
        <div className="chat__placeholder">
          <span>Выберите чат и начните общение!</span>
        </div>
      )}
    </div>
  );
};

export default Chat;
