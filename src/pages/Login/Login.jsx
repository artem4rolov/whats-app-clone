import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQrCode, userLogin } from "../../redux/slices/auth/authActions";
import { useNavigate } from "react-router";
import { setUserInfo } from "../../redux/slices/auth/auth";
import Loader from "../../components/Loader/Loader";

import "./Login.css";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();

  // достаем переменные из redux
  const { loading, userStatus, error, qrCode } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const [idInstance, setIdInstance] = React.useState("1101820393");
  const [apiTokenInstance, setApiTokenInstance] = React.useState(
    "ea6933046cf743d3b36fc936a69284a8c8773d7c00634a24b8"
  );
  const [showQr, setShowQr] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // установка данных пользователя в стейт redux (id инстанса и токен инстанса для последующих запросов в приложении)
    dispatch(setUserInfo({ idInstance, apiTokenInstance }));

    // авторизация
    dispatch(userLogin({ idInstance, apiTokenInstance }));
  };

  React.useEffect(() => {
    if (userStatus === "authorized") {
      navigate("/");
    }
  }, [userStatus]);

  return (
    <div className="login">
      {!showQr && (
        <>
          <span className="login__title">Вход</span>
          <form action="" onSubmit={handleSubmit}>
            <div className="input">
              <label htmlFor="">Ваш idInstance:</label>
              <input
                value={idInstance}
                type="text"
                name="idInstance"
                onChange={(e) => setIdInstance(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="">Ваш apiTokenInstance:</label>
              <input
                value={apiTokenInstance}
                type="text"
                name="apiTokenInstance"
                onChange={(e) => setApiTokenInstance(e.target.value)}
              />
            </div>
            {!loading ? <input type="submit" value={"Войти"} /> : <Loader />}
          </form>
          <span className="login__error">
            {userStatus && userStatus !== "authorized"
              ? "Авторизуйте аккаунт через QR-код"
              : null}
          </span>
          <span
            className="login__subtitle"
            onClick={() => {
              setShowQr((prev) => !prev);
              dispatch(getQrCode({ idInstance, apiTokenInstance }));
            }}
          >
            Авторизация аккаунта
          </span>
        </>
      )}

      {showQr && (
        <>
          <span className="login__title">Авторизация аккаунта</span>
          {loading && <Loader />}
          {qrCode ? (
            <div className="qr__code">
              {qrCode && <img src={`data:image/png;base64,${qrCode}`} />}
            </div>
          ) : (
            "QR-код появится в случае неавторизованного аккаунта Whats'App"
          )}
          <div className="login__qrcode">
            <span
              className="qrcode__refresh"
              onClick={() =>
                dispatch(getQrCode({ idInstance, apiTokenInstance }))
              }
            >
              Обновить QR-код
            </span>
            <span
              className="login__subtitle"
              onClick={() => setShowQr((prev) => !prev)}
            >
              Вход
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
