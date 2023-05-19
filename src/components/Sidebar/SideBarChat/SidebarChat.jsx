import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./SidebarChat.css";

import { Avatar } from "@mui/material";
import { setSelectedChat } from "../../../redux/slices/messages/messages";
import { getLastMessage } from "../../../redux/slices/chats/chatsActions";

const SidebarChat = ({ addNewChat, chat }) => {
  const dispatch = useDispatch();

  // достаем переменные из redux
  const { idInstance, apiTokenInstance } = useSelector((state) => state.auth);
  const { chats, currentChat, loadingChats, lastMessage } = useSelector(
    (state) => state.chats
  );

  const createChat = () => {
    const roomName = prompt("Придумайте название чата");

    if (roomName) {
      // что-то делаем
    }
  };

  // React.useEffect(() => {
  //   if (chat) {
  //     dispatch(
  //       getLastMessage({
  //         idInstance,
  //         apiTokenInstance,
  //         phoneNumber: chat.chatId,
  //       })
  //     );
  //   }

  //   return () => {};
  // }, [idInstance, apiTokenInstance, dispatch, chat]);

  return !addNewChat ? (
    <div
      className="sidebarChat"
      onClick={() => dispatch(setSelectedChat(chat))}
    >
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
