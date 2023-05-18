import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth/auth";
import chatsReducer from "./slices/chats/chats";

export const store = configureStore({
  reducer: {
    // авторизация
    auth: authReducer,
    // чаты пользователя
    chats: chatsReducer,
  },
});
