import { createSlice } from "@reduxjs/toolkit";
import {
  getQrCode,
  getUserAvatar,
  getUserWid,
  userLogin,
  userLogout,
} from "./authActions";

const initialState = {
  userWid: null, // id пользователя
  userAvatar: null, // аватарка пользователя
  userStatus: null, // пользователь
  idInstance: null, // id инстанса из личного кабинета green.api
  apiTokenInstance: null, // токен инстанса из личного кабинета green.api
  qrCode: null, // qrCode
  loading: false, // отображение загрузки
  error: null, // значение ошибки
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      // меняем статус пользователя и редиректим на страницу логина
      state.idInstance = action.payload.idInstance;
      state.apiTokenInstance = action.payload.apiTokenInstance;
    },
  },
  extraReducers: (builder) => {
    builder
      // авторизация
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.userStatus = null;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userStatus = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.userStatus = null;
        state.error = action.payload;
      })
      // получение QR-кода для авторизации аккаунта
      .addCase(getQrCode.pending, (state) => {
        state.loading = true;
        state.qrCode = null;
        state.userStatus = null;
        state.error = null;
      })
      .addCase(getQrCode.fulfilled, (state, action) => {
        state.loading = false;
        state.qrCode = action.payload;
        state.userStatus = null;
      })
      .addCase(getQrCode.rejected, (state, action) => {
        state.loading = false;
        state.qrCode = null;
        state.error = action.payload;
        state.userStatus = null;
      })
      // разлогинить аккаунт
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.qrCode = null;
        state.userStatus = null;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.qrCode = action.payload;
        state.userStatus = null;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.qrCode = null;
        state.error = action.payload;
        state.userStatus = null;
      })
      // получить данные пользователя (wid)
      .addCase(getUserWid.pending, (state) => {
        state.loading = true;
        state.userWid = null;
        state.error = null;
      })
      .addCase(getUserWid.fulfilled, (state, action) => {
        state.loading = false;
        state.userWid = action.payload;
      })
      .addCase(getUserWid.rejected, (state, action) => {
        state.loading = false;
        state.userWid = null;
        state.error = action.payload;
      })
      // получить аватар пользователя
      .addCase(getUserAvatar.pending, (state) => {
        state.loading = true;
        state.userAvatar = null;
        state.error = null;
      })
      .addCase(getUserAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.userAvatar = action.payload;
      })
      .addCase(getUserAvatar.rejected, (state, action) => {
        state.loading = false;
        state.userAvatar = null;
        state.error = action.payload;
      });
  },
});

export const { setUserInfo } = authSlice.actions;
export default authSlice.reducer;
