import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
// import { store } from "../store";
// import { userLogout } from "../slices/auth/authActions";

// настройка для запроса от бэка scrf токена ПЕРЕД каждым запросе на клиенте
const apiClient = axios.create({
  withCredentials: true,
});

// Отлавливаем ошибки при запросах с помощью axios interceptors
const refreshAuthLogic = async (failedRequest) => {
  // если статус ошибки 419 (устаревший XSRF токен)
  if (failedRequest.response.message === "notAuthorized") {
    // получаем новый токен от сервера
    // await axios.get("/api/csrf-cookie");

    console.log("Аккаунт не авторизован");
    return;
    // повторяем запрос, который ранее был с ошибкой устаревшего токена, только на этот раз меняем его config (новый токен от сервера)
    // return axios(failedRequest.response.config);
  }

  return Promise.reject();
};

// Instantiate the interceptor
createAuthRefreshInterceptor(apiClient, refreshAuthLogic);

export default apiClient;
