import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ChatBody.css";
import { getMessages } from "../../../redux/slices/messages/messagesActions";

const ChatBody = () => {
  const dispatch = useDispatch();
  const ref = React.useRef();

  // достаем переменные из redux
  const { idInstance, apiTokenInstance } = useSelector((state) => state.auth);
  const { chat, loadingMessages, messages, needRefreshData } = useSelector(
    (state) => state.messages
  );

  React.useEffect(() => {
    if (chat) {
      dispatch(
        getMessages({ idInstance, apiTokenInstance, phoneNumber: chat.chatId })
      );
      return;
    }

    if (needRefreshData) {
      dispatch(
        getMessages({ idInstance, apiTokenInstance, phoneNumber: chat.chatId })
      );
      return;
    }

    return () => {};
  }, [chat, needRefreshData]);

  // скроллим до последнего особщения
  React.useEffect(() => {
    ref.current?.scrollIntoView();
  }, [messages]);

  console.log(messages);

  return (
    <div className="chat__body">
      {messages &&
        messages.length > 0 &&
        messages.map((message) => {
          return message.type === "outgoing" ? (
            <React.Fragment key={message.idMessage || Math.random() * 1000}>
              {/* мое сообщение */}
              <p
                ref={ref}
                className={`chat__message ${true && "chat__reciever"}`}
              >
                <span className="chat__name">Артем Фролов</span>
                {message.textMessage}
                <span className="chat__timestamp">
                  {new Date(message.timestamp * 1000).toLocaleDateString()}
                </span>
              </p>
            </React.Fragment>
          ) : (
            <React.Fragment key={message.idMessage || Math.random() * 1000}>
              {/* сообщение собеседника */}
              <p ref={ref} className={`chat__message`}>
                <span className="chat__name">{chat.name}</span>
                {message.textMessage}
                <span className="chat__timestamp">
                  {new Date(message.timestamp * 1000).toLocaleDateString()}
                </span>
              </p>
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default ChatBody;
