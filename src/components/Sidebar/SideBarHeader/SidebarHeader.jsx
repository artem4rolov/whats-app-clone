import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./SideBarHeader.css";

import Fade from "@mui/material/Fade";
import Menu from "@mui/material/Menu";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, CircularProgress, IconButton, MenuItem } from "@mui/material";
import {
  getUserAvatar,
  userLogout,
} from "../../../redux/slices/auth/authActions";

const SideBarHeader = () => {
  const dispatch = useDispatch();

  // достаем переменные из redux
  const { apiTokenInstance, idInstance, userWid, userAvatar, loading } =
    useSelector((state) => state.auth);
  const { chats, loadingChats } = useSelector((state) => state.chats);

  // для модалки (mui)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (userWid) {
      dispatch(getUserAvatar({ idInstance, apiTokenInstance, id: userWid }));
    }
  }, [userWid]);

  console.log(userAvatar);

  return (
    <div className="sidebar__header">
      {!loading ? (
        <Avatar alt="user avatar" src={userAvatar ? userAvatar : null} />
      ) : (
        <CircularProgress />
      )}
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
  );
};

export default SideBarHeader;
