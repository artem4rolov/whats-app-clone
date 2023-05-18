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
      const data = await apiClient.get(
        `${process.env.REACT_APP_API_URL}/waInstance${idInstance}/logout/${apiTokenInstance}`
      );

      return data.status;
    } catch (error) {
      return error.status;
    }
  }
);
