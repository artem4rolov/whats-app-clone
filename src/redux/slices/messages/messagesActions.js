import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// получение сообщений чата
export const getMessages = createAsyncThunk(
  "messages/getMessages",
  async ({ idInstance, apiTokenInstance, phoneNumber }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
        {
          chatId: phoneNumber,
          count: 50,
        },
        config
      );

      return data;
    } catch (error) {
      return error.response.message;
    }
  }
);
