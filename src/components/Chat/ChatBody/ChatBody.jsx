import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ChatBody.css";
import { getMessages } from "../../../redux/slices/messages/messagesActions";

const ChatBody = () => {
  const dispatch = useDispatch();

  // достаем переменные из redux
  const { idInstance, apiTokenInstance } = useSelector((state) => state.auth);
  const { chat, loadingMessages, messages } = useSelector(
    (state) => state.messages
  );

  React.useEffect(() => {
    if (chat) {
      dispatch(
        getMessages({ idInstance, apiTokenInstance, phoneNumber: chat.chatId })
      );
    }

    return () => {};
  }, [chat]);

  console.log(messages);

  return (
    <div className="chat__body">
      {messages &&
        messages.map((message) => {
          return message.type === "outgoing" ? (
            <>
              {/* мое сообщение */}
              <p className={`chat__message ${true && "chat__reciever"}`}>
                <span className="chat__name">Артем Фролов</span>
                <span className="chat__timestamp">{message.textMessage}</span>
              </p>
            </>
          ) : (
            <>
              {/* сообщение собеседника */}
              <p className={`chat__message`}>
                <span className="chat__name">{chat.name}</span>
                <span className="chat__timestamp">{message.textMessage}</span>
              </p>
            </>
          );
        })}
    </div>
  );
};

export default ChatBody;
