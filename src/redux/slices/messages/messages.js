import { createSlice } from "@reduxjs/toolkit";
import { getMessages, sendMessage } from "./messagesActions";

const initialState = {
  chat: null, // пользователь
  messages: null, // id инстанса из личного кабинета green.api
  needRefreshData: false, // флаг на обновление данных
  loadingMessages: false, // отображение загрузки
  error: null, // значение ошибки
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      // устанавливаем конкретный чат с пользователем по клику
      state.chat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // получение сообщений чата
      .addCase(getMessages.pending, (state) => {
        state.loadingMessages = true;
        state.messages = null;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loadingMessages = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loadingMessages = false;
        state.messages = null;
        state.error = action.payload;
      })
      // отправка сообщения
      .addCase(sendMessage.pending, (state) => {
        state.loadingMessages = true;
        state.needRefreshData = false;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loadingMessages = false;
        state.needRefreshData = true;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loadingMessages = false;
        state.needRefreshData = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedChat } = messagesSlice.actions;
export default messagesSlice.reducer;
