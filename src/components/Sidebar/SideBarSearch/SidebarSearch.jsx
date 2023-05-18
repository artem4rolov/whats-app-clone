import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./SidebarSearch.css";

import { SearchOutlined } from "@mui/icons-material";
import { getChatBySearch } from "../../../redux/slices/chats/chatsActions";

const SidebarSearch = () => {
  const dispatch = useDispatch();

  // достаем переменные из redux
  const { idInstance, apiTokenInstance } = useSelector((state) => state.auth);
  const { currentChat, loadingChats } = useSelector((state) => state.chats);

  const [input, setInput] = React.useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (input) {
      dispatch(
        getChatBySearch({ idInstance, apiTokenInstance, phoneNumber: input })
      );
    }
    setInput("");
  };

  console.log(currentChat);

  return (
    <div className="sidebar__search">
      <form className="sidebar_searchContainer">
        <SearchOutlined />
        <input
          type="text"
          placeholder="Введите номер абонента"
          value={input}
          onInput={(e) => setInput(e.target.value)}
        />
        <input
          className="sidebar__submit"
          type="submit"
          value="Поиск"
          onChange={() => {}}
          onClick={(e) => handleSearch(e)}
        />
      </form>
    </div>
  );
};

export default SidebarSearch;
