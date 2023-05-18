import React from "react";

import "./Sidebar.css";

import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, IconButton, MenuItem } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import Fade from "@mui/material/Fade";
import Menu from "@mui/material/Menu";
import SidebarChat from "./SideBarChat/SidebarChat";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/slices/auth/authActions";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const dispatch = useDispatch();

  // достаем переменные из redux
  const { loading, userStatus, error, qrCode, apiTokenInstance, idInstance } =
    useSelector((state) => state.auth);

  // для модалки (mui)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton
            onClick={handleClick}
            aria-haspopup="true"
            aria-controls={open ? "fade-menu" : undefined}
            id="fade-button"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVertIcon />
          </IconButton>
        </div>

        {open && (
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem
              onClick={() =>
                dispatch(userLogout({ idInstance, apiTokenInstance }))
              }
            >
              Выйти
            </MenuItem>
          </Menu>
        )}
      </div>

      <div className="sidebar__search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Поиск" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
};

export default Sidebar;
