import React from "react";
import { Route, Routes, useNavigate } from "react-router";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { getUserWid } from "./redux/slices/auth/authActions";

function App() {
  const navigate = useNavigate();

  // достаем переменные из redux
  const { loading, userStatus, error, idInstance, apiTokenInstance } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // редиректим, если статус пользователя "не авторизован"
  React.useEffect(() => {
    if (userStatus !== "authorized") {
      navigate("/login");
    }

    // если пользователь вошел, получаем его wid
    if (userStatus === "authorized") {
      dispatch(getUserWid({ idInstance, apiTokenInstance }));
    }
  }, [userStatus]);

  return (
    <div className="app">
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
