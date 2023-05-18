import { createSlice } from "@reduxjs/toolkit";
import { getChatBySearch, getLastMessage } from "./chatsActions";

const initialState = {
  currentChat: null, // пользователь
  lastMessage: null, // последнее сообшение
  chats: null, // id инстанса из личного кабинета green.api
  loadingChats: false, // отображение загрузки
  error: null, // значение ошибки
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    // setUserInfo: (state, action) => {
    //   // меняем статус пользователя и редиректим на страницу логина
    //   state.idInstance = action.payload.idInstance;
    //   state.apiTokenInstance = action.payload.apiTokenInstance;
    // },
  },
  extraReducers: (builder) => {
    builder
      // получение чата через поиск
      .addCase(getChatBySearch.pending, (state) => {
        state.loadingChats = true;
        state.currentChat = null;
        state.chats = null;
        state.error = null;
      })
      .addCase(getChatBySearch.fulfilled, (state, action) => {
        state.loadingChats = false;
        state.currentChat = action.payload;
      })
      .addCase(getChatBySearch.rejected, (state, action) => {
        state.loadingChats = false;
        state.currentChat = null;
        state.error = action.payload;
      })
      // получение последнего сообщения
      .addCase(getLastMessage.pending, (state) => {
        state.loadingChats = true;
        state.lastMessage = null;
        state.error = null;
      })
      .addCase(getLastMessage.fulfilled, (state, action) => {
        state.loadingChats = false;
        state.lastMessage = action.payload;
      })
      .addCase(getLastMessage.rejected, (state, action) => {
        state.loadingChats = false;
        state.lastMessage = null;
        state.error = action.payload;
      });
  },
});

// export const { setUserInfo } = chatsSlice.actions;
export default chatsSlice.reducer;
