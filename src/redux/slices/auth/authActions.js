import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api";
import axios from "axios";

// вход
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ idInstance, apiTokenInstance }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
      );

      return data.stateInstance;
    } catch (error) {
      return error.response.message;
    }
  }
);

// получить QR-код для авторизации аккаунта (затем необходимо повторно залогиниться в форме)
export const getQrCode = createAsyncThunk(
  "auth/getQrCode",
  async ({ idInstance, apiTokenInstance }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/waInstance${idInstance}/qr/${apiTokenInstance}`
      );
      return data.message;
    } catch (error) {
      return error.status;
    }
  }
);

// logout
export const userLogout = createAsyncThunk(
  "auth/userLogout",
  async ({ idInstance, apiTokenInstance }) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/waInstance${idInstance}/logout/${apiTokenInstance}`
      );

      return data.status;
    } catch (error) {
      return error.status;
    }
  }
);

// получить данные о пользователе (wid)
export const getUserWid = createAsyncThunk(
  "auth/getUserWid",
  async ({ idInstance, apiTokenInstance }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/waInstance${idInstance}/getSettings/${apiTokenInstance}`
      );

      return data.wid;
    } catch (error) {
      return error.status;
    }
  }
);

// получить аватар пользователя
export const getUserAvatar = createAsyncThunk(
  "auth/getUserAvatar",
  async ({ idInstance, apiTokenInstance, id }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/waInstance${idInstance}/getAvatar/${apiTokenInstance}`,
        {
          chatId: id,
        }
      );

      return data.urlAvatar;
    } catch (error) {
      return error.status;
    }
  }
);
