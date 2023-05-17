import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api";
import axios from "axios";

// вход
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ IdInstance, ApiTokenInstance }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/waInstance${IdInstance}/getStateInstance/${ApiTokenInstance}`
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
  async ({ IdInstance, ApiTokenInstance }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/waInstance${IdInstance}/qr/${ApiTokenInstance}`
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
  async ({ IdInstance, ApiTokenInstance }) => {
    try {
      const data = await apiClient.get(
        `${process.env.REACT_APP_API_URL}/waInstance${IdInstance}/qr/${ApiTokenInstance}`
      );

      return data.status;
    } catch (error) {
      return error.status;
    }
  }
);
