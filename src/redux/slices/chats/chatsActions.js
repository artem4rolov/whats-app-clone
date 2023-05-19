import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// получение чата при поиске
export const getChatBySearch = createAsyncThunk(
  "chats/getChatBySearch",
  async ({ idInstance, apiTokenInstance, phoneNumber }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
        {
          chatId: `${phoneNumber}@c.us`,
        }
      );

      return data;
    } catch (error) {
      return error.response.message;
    }
  }
);

// получение последнего сообщения в списке чатов
export const getLastMessage = createAsyncThunk(
  "chats/getLastMessage",
  async ({ idInstance, apiTokenInstance, phoneNumber }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
        {
          chatId: phoneNumber,
          count: 1,
        }
      );

      return data.textMessage;
    } catch (error) {
      return error.response.message;
    }
  }
);
