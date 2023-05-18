import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth/auth";
import chatsReducer from "./slices/chats/chats";
import messagesReducer from "./slices/messages/messages";

export const store = configureStore({
  reducer: {
    // авторизация
    auth: authReducer,
    // чаты пользователя
    chats: chatsReducer,
    // сообщения конкретного чата
    messages: messagesReducer,
  },
});
