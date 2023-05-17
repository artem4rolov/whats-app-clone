import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth/auth";

export const store = configureStore({
  reducer: {
    // авторизация
    auth: authReducer,
  },
});
