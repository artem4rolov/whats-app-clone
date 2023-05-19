import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Sidebar.css";

import SidebarChat from "./SideBarChat/SidebarChat";
import Loader from "../Loader/Loader";
import SideBarHeader from "./SideBarHeader/SideBarHeader";
import SidebarSearch from "./SideBarSearch/SidebarSearch";

const Sidebar = () => {
  const dispatch = useDispatch();

  // достаем переменные из redux
  const { apiTokenInstance, idInstance } = useSelector((state) => state.auth);
  const { chats, currentChat, loadingChats } = useSelector(
    (state) => state.chats
  );

  React.useEffect(() => {
    // dispatch(getChats({ apiTokenInstance, idInstance }));
  }, []);

  // console.log(chats);

  return (
    <div className="sidebar">
      {/* шапка с аватаркой и кнопками (+модалка logout) */}
      <SideBarHeader />

      {/* поиск чатов по номеру телефона */}
      <SidebarSearch />

      {/* вывод чатов (вывод чата при поиске) */}
      {!loadingChats ? (
        <div className="sidebar__chats">
          {/* <SidebarChat addNewChat /> */}
          {currentChat ? (
            <SidebarChat chat={currentChat} />
          ) : (
            <span className="sidebar__desc">
              Найдите чат и выберете его в списке
            </span>
          )}
        </div>
      ) : (
        <div className="sidebar__chats">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
