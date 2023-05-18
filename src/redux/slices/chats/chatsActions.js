import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// получение чата при поиске
export const getChatBySearch = createAsyncThunk(
  "chats/getChatBySearch",
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
        `${process.env.REACT_APP_API_URL}/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
        {
          chatId: `${phoneNumber}@c.us`,
        },
        config
      );

      return data;
    } catch (error) {
      return error.response.message;
    }
  }
);
