import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Sidebar.css";

import SidebarChat from "./SideBarChat/SidebarChat";
import SidebarHeader from "./SideBarHeader/SidebarHeader";
import SidebarSearch from "./SideBarSearch/SidebarSearch";

const Sidebar = () => {
  const dispatch = useDispatch();

  // достаем переменные из redux
  const { apiTokenInstance, idInstance } = useSelector((state) => state.auth);
  const { chats, currentChat, loading } = useSelector((state) => state.chats);

  React.useEffect(() => {
    // dispatch(getChats({ apiTokenInstance, idInstance }));
  }, []);

  // console.log(chats);

  return (
    <div className="sidebar">
      <SidebarHeader />

      <SidebarSearch />

      <div className="sidebar__chats">
        {/* <SidebarChat addNewChat /> */}
        {currentChat ? <SidebarChat chat={currentChat} /> : "chats && chats"}
      </div>
    </div>
  );
};

export default Sidebar;
