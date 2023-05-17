import { createSlice } from "@reduxjs/toolkit";
// функция авторизации
import { getQrCode, userLogin } from "./authActions";

const initialState = {
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
        state.error = null;
      })
      .addCase(getQrCode.fulfilled, (state, action) => {
        state.loading = false;
        state.qrCode = action.payload;
      })
      .addCase(getQrCode.rejected, (state, action) => {
        state.loading = false;
        state.qrCode = null;
        state.error = action.payload;
      });
  },
});

export const { setUserInfo } = authSlice.actions;
export default authSlice.reducer;
