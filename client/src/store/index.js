import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@features/auth/auth.slice";
import wordReducer from "@features/word/word.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    word: wordReducer,
  },
  devTools: true,
});

export default store;
