import React from "react";

import "./ChatFooter.css";

import { InsertEmoticon, Mic } from "@mui/icons-material";

const ChatFooter = () => {
  const [input, setInput] = React.useState("");

  const sendMessage = (e) => {
    e.preventDefault();
  };

  return (
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
  );
};

export default ChatFooter;
