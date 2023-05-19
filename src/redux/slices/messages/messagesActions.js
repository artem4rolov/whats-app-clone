import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// получение сообщений чата
export const getMessages = createAsyncThunk(
  "messages/getMessages",
  async ({ idInstance, apiTokenInstance, phoneNumber }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
        {
          chatId: phoneNumber,
          count: 100,
        }
      );

      // сразу переворачиваем массив, чтобы отображать от последнего сообщения по дате
      return data.reverse();
    } catch (error) {
      return error.response.message;
    }
  }
);

// получение сообщений чата
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ idInstance, apiTokenInstance, phoneNumber, message }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        {
          chatId: phoneNumber,
          message,
        }
      );

      return data;
    } catch (error) {
      return error.response.message;
    }
  }
);
