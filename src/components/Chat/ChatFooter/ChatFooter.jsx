import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ChatFooter.css";

import { InsertEmoticon, Mic } from "@mui/icons-material";
import {
  getMessages,
  getNotifications,
  sendMessage,
} from "../../../redux/slices/messages/messagesActions";

const ChatFooter = () => {
  const dispatch = useDispatch();

  // достаем переменные из redux
  const { idInstance, apiTokenInstance } = useSelector((state) => state.auth);
  const { chat, loadingMessages, messages, needRefreshData } = useSelector(
    (state) => state.messages
  );
  const [input, setInput] = React.useState("");

  // отправка сообщения
  const sendMess = async () => {
    if (input && idInstance && apiTokenInstance) {
      await new Promise((res, rej) => {
        dispatch(
          sendMessage({
            idInstance,
            apiTokenInstance,
            phoneNumber: chat.chatId,
            message: input,
          })
        );
        console.log("first");
        res();
      });
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMess();
    // console.log(input);
  };

  return (
    <div className="chat__footer">
      <InsertEmoticon />
      <form action="">
        <input
          value={input}
          onChange={() => {}}
          onInput={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Введите текст сообщения"
        />
        <button onClick={(e) => handleSend(e)}>Отправить</button>
      </form>
      <Mic />
    </div>
  );
};

export default ChatFooter;
