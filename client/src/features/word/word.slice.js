import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  words: [],
  loading: false,
  error: null,
};

const wordSlice = createSlice({
  name: "word",
  initialState,
  reducers: {
    // LẤY TỪ
    getWordsPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    getWordsSuccess: (state, action) => {
      state.loading = false;
      state.words = action.payload;
    },
    getWordsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // LƯU TỪ
    saveWordSuccess: (state, action) => {
      state.loading = false;
      state.words = state.words.map((word) => {
        if (word.id === action.payload) {
          return {
            ...word,
            isSaved: true,
          };
        }
        return word;
      });
    },
    // GỠ LƯU TỪ
    unsaveWordSuccess: (state, action) => {
      state.loading = false;
      state.words = state.words.map((word) => {
        if (word.id === action.payload) {
          return {
            ...word,
            isSaved: false,
          };
        }
        return word;
      });
    },
  },
});

export const {
  getWordsFailed,
  getWordsPending,
  getWordsSuccess,
  saveWordSuccess,
  unsaveWordSuccess,
} = wordSlice.actions;

export default wordSlice.reducer;
