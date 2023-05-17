import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQrCode, userLogin } from "../../redux/slices/auth/authActions";
import { useNavigate } from "react-router";
import { setUserInfo } from "../../redux/slices/auth/auth";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  // достаем переменные из redux
  const { loading, userStatus, error, qrCode } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const [idInstance, setIdInstance] = React.useState(null);
  const [apiTokenInstance, setApiTokenInstance] = React.useState(null);
  const [showQr, setShowQr] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // установка данных пользователя в стейт redux (id инстанса и токен инстанса для последующих запросов в приложении)
    dispatch(setUserInfo({ idInstance, apiTokenInstance }));

    // авторизация
    dispatch(
      userLogin({ IdInstance: idInstance, ApiTokenInstance: apiTokenInstance })
    );

    // тут же получаем qr-код, на случай если аккаунт не авторизован
    dispatch(
      getQrCode({ IdInstance: idInstance, ApiTokenInstance: apiTokenInstance })
    );
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
                type="text"
                name="idInstance"
                onInput={(e) => setIdInstance(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="">Ваш apiTokenInstance:</label>
              <input
                type="text"
                name="apiTokenInstance"
                onInput={(e) => setApiTokenInstance(e.target.value)}
              />
            </div>
            <input type="submit" value={"Войти"} />
          </form>
          <span
            className="login__subtitle"
            onClick={() => setShowQr((prev) => !prev)}
          >
            Авторизация аккаунта
          </span>
        </>
      )}

      {showQr && (
        <>
          <span className="login__title">Авторизация аккаунта</span>
          {qrCode ? (
            <div className="qr__code">
              {qrCode ? <img src={`data:image/png;base64,${qrCode}`} /> : ""}
            </div>
          ) : (
            "QR-код появится в случае неавторизованного аккаунта Whats'App"
          )}
          <span
            className="login__subtitle"
            onClick={() => setShowQr((prev) => !prev)}
          >
            Вход
          </span>
        </>
      )}
    </div>
  );
};

export default Login;
